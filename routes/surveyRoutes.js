const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const mongoose = require('mongoose');
const Survey = mongoose.model('survey');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');
const _ = require('lodash');
const  Path  = require("path-parser");
const { URL } = require('url');
module.exports = (app) => {

    app.delete('/api/survey/:surveyId', requireLogin, async (req, res) => {
        try{
            await Survey.deleteOne({
              _id: req.params.surveyId,
            });
            const surveys = await Survey.find({ _user: req.user.id }).select({
            recipients: false,
            });
            res.json({
            surveys,
            });
        }catch(err){
            res.json({
                success: false
            })
        }
    })

    app.get('/api/surveys', requireLogin, async (req, res) => {
        const surveys = await Survey.find({ _user: req.user.id})
        .select({recipients: false})
        res.json({
            surveys
        })
    })

    app.get('/api/survey/:surveyId/:choice', (req, res) => {
        res.send('THANKS FOR FEEDBACK')
    })
  
    app.post("/api/survey/webhooks", (req, res) => {
        const p = new Path("/api/survey/:surveyId/:choice");
        const events = _.map(req.body, (event) => {
        const pathname = new URL(event.url).pathname;
        const match = p.test(pathname);
        if(match){
            return {
                email: event.email,
                surveyId: match.surveyId,
                choice: match.choice
            };
        }
    });
        const existingEvents = _.compact(events);
        const uniqueEvents = _.uniqBy(existingEvents, 'email', 'surveyId')
        uniqueEvents.forEach(({surveyId, email, choice}) => {
            Survey.updateOne(
              {
                _id: surveyId,
                recipients: {
                  $elemMatch: { email: email, responded: false },
                },
              },
              {
                $inc: { [choice]: 1 },
                $set: { "recipients.$.responded": true },
                lastResponded: new Date()
              }
            ).exec();
        })
        res.send({})
    });

    //   app.post("/api/survey/webhooks", (req, res) => {
    //     const p = new Path("/api/survey/:surveyId/:choice");
    //     _.chain(req.body)
    //       .map(({ email, url }) => {
    //         const match = p.test(new URL(url).pathname);
    //         if (match) {
    //           return { email, surveyId: match.surveyId, choice: match.choice };
    //         }
    //       })
    //       .compact()
    //       .uniqBy("email", "surveyId")
    //       .each(({ surveyId, email, choice }) => {
    //         Survey.updateOne(
    //           {
    //             _id: surveyId,
    //             recipients: {
    //               $elemMatch: { email: email, responded: false },
    //             },
    //           },
    //           {
    //             $inc: { [choice]: 1 },
    //             $set: { "recipients.$.responded": true },
    //             lastResponded: new Date(),
    //           }
    //         ).exec();
    //       })
    //       .value();
    //       res.send({});
    //   });

    app.post('/api/survey', requireLogin, requireCredits, async (req, res) => {
        let { title, body, recipients, subject } = req.body;
        let survey = new Survey({
            title,
            body,
            subject,
            recipients: recipients.split(',').map((email) => {
                return {
                    email: email.trim()
                }
            }),
            _user: req.user.id,
            dateSent: Date.now()
        });

        
        //Send the email
        const mailer = new Mailer(survey, surveyTemplate(survey));
        try{
            await mailer.send();
            await survey.save();
            req.user.credits -= 1;
            const user = await req.user.save();
            res.send(user);

        } catch(err){
            res.status(422).send(err);
        }
    })
}