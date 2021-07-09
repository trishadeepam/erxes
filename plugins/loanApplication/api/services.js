//FIXME: Move this to rabbitMQ.
import axios from axios

const getNewApplicationValidity = async ({application}) => {
  return {
    pass: true
  }
} 
const getExistingApplicationValidity = async ({
  application, borrower, company
}) => {
  return {
    pass: true
  }

}
export default {
  getNewApplicationValidity,
  getExistingApplicationValidity
}