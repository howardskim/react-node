// const regex = /^(([^<>()[]\\.,;:s@"]+(.[^<>()[]\\.,;:s@"]+)*)|(".+"))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$/;
const regex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
export default (emails) => {
  let invalidEmails =  emails.split(',').map(email => email.trim()).filter((email) => {
    return regex.test(email) === false;
  });
  if(invalidEmails.length){
      return `These emails are invalid: ${invalidEmails}`
  };
  return null;
}