import * as objectMapper from 'object-mapper'
import { isEmpty } from 'underscore'
import { getName, getSalutation, getGender } from './utils'
import * as dayjs from 'dayjs'
import { getGeneratedNameForNode } from 'typescript'
const mapAddress = (address, addType, addTypeText) => {
  if (!address) {
    return {}
  }
  const map = {
    addressLine1: 'address_line_1',
    addressLine2: 'address_line_2',
    pincode: 'zipcode',
    state: 'STATE',
    district: 'DISTRICT'
  }
  const lmsAddress = objectMapper(address, map)
  lmsAddress.type = addType
  lmsAddress.type_value = addTypeText
  return lmsAddress
}
export const mapCustomer = (customer, borrowerType) => {
  const customerMap = {
    lmsCustomerId: {
      key: 'personal_details.id',
      default: null
    },
    lmsCustomerFormattedId: {
      key: 'personal_details.formatted_id',
      default: null
    },
    firstName: 'personal_details.first_name',
    middleName: 'personal_details.middle_name',
    lastName: 'personal_details.middle_name',
    fatherName: {
      key: 'personal_details.father_name',
      default: ''
    },
    motherName: {
      key: 'personal_details.mother_name',
      default: ''
    },
    birthDate: {
      key: 'personal_details.date_of_birth',
      transform: value =>
        dayjs(value)
          .valueOf()
          .toString()
    },
    sex: [
      {
        key: 'personal_details.salutation',
        transform: value => getSalutation(value, customer)
      },
      {
        key: 'personal_details.gender',
        transform: value => getGender(value)
      }
    ],
    maritalStatus: {
      key: 'personal_details.marital_status',
      default: 'MARRIED'
    },
    // FIXME: as per master data
    userEducation: 'personal_details.education', // FIXME: as per master data
    monthlyIncome: [
      {
        key: 'additional_details.annual_income',
        transform: value => (value * 12).toString()
      }
    ],
    email: 'contact_details.primary_email',
    primaryPhone: 'contact_details.mobile_number'
  }
  const lmsCustomer = objectMapper(customer, customerMap)
  lmsCustomer.personal_details.photo = ''
  lmsCustomer.personal_details.nationality = 'INDIAN'
  lmsCustomer.personal_details.residential_status = 'RESIDENT'
  lmsCustomer.personal_details.preferred_language = 'en'
  if (borrowerType !== 'individual') {
    lmsCustomer.additional_details.occupation = 'BUSINESS'
    lmsCustomer.additional_details.source_of_funds = 'BUSINESS'
    lmsCustomer.additional_details.physically_challenged = 'false'
  }
  lmsCustomer.mobile_country_code = '91'
  lmsCustomer.handle_details = {
    handle_type: 'email',
    handle_value: customer.email
  }
  const businessAddress = mapAddress(
    customer.businessAddress,
    'BUSINESS',
    'Business'
  )
  const communicationAddress = mapAddress(
    customer.residentialAddress,
    'CORRESPONDENCE',
    'Correspondence'
  )
  const permanentAddress = mapAddress(
    customer.permanentAddress,
    'PERMANENT',
    'Permanent'
  )
  lmsCustomer.address_details = []
  lmsCustomer.address_details.push(businessAddress)
  lmsCustomer.address_details.push(communicationAddress)
  if (isEmpty(permanentAddress)) {
    lmsCustomer.address_details.push(permanentAddress)
  }

  lmsCustomer.role_details = {
    id: 12
  } //FIXME: Need to find the correct id ask navneet
  lmsCustomer.document_details = [
    {
      identifier: 'Q8378854',
      type: 'PASSPORT',
      purpose: 'POI_POA',
      valid_until: '',
      description: '',
      document_code: 'e6ba9a3d-c0be-4dad-8f8d-8f816d0f3f9c',
      version: '1',
      type_value: 'Passport',
      purpose_value: 'Proof Of Identity',
      file_names: [
        {
          name: '1.pdf',
          file_number: '1'
        }
      ],
      number_of_files: '1'
    }
  ]

  if (customer.hasUdyamAdhaar) {
    lmsCustomer.document_details.push({
      identifier: 'Q8378854',
      type: 'PAN',
      purpose: 'POI',
      valid_until: '',
      description: '',
      document_code: 'e6ba9a3d-c0be-4dad-8f8d-8f816d0f3f9c',
      version: '1',
      type_value: 'PAN',
      purpose_value: 'Proof Of Identity',
      file_names: [
        {
          name: '1.pdf',
          file_number: '1'
        }
      ],
      number_of_files: '1'
    })
  }
  if (customer.hasSne) {
    lmsCustomer.document_details.push({
      identifier: 'Q8378854',
      type: 'SNE',
      purpose: 'DOC_PUR_006',
      valid_until: '',
      description: '',
      document_code: 'e6ba9a3d-c0be-4dad-8f8d-8f816d0f3f9c',
      version: '1',
      type_value: 'Shops and Establishment',
      purpose_value: 'Proof Of Identity',
      file_names: [
        {
          name: '1.pdf',
          file_number: '1'
        }
      ],
      number_of_files: '1'
    })
  }
  if (customer.hasGSTN) {
    lmsCustomer.document_details.push({
      identifier: 'Q8378854',
      type: 'GSTN',
      purpose: 'POI_POA',
      valid_until: '',
      description: '',
      document_code: 'e6ba9a3d-c0be-4dad-8f8d-8f816d0f3f9c',
      version: '1',
      type_value: 'GSTN',
      purpose_value: 'Proof Of Identity',
      file_names: [
        {
          name: '1.pdf',
          file_number: '1'
        }
      ],
      number_of_files: '1'
    })
  }
  if (customer.hasItr) {
    lmsCustomer.document_details.push({
      identifier: 'Q8378854',
      type: 'ITR',
      purpose: 'POI_POA',
      valid_until: '',
      description: '',
      document_code: 'e6ba9a3d-c0be-4dad-8f8d-8f816d0f3f9c',
      version: '1',
      type_value: 'Income Tax Returns',
      purpose_value: 'Proof Of Income',
      file_names: [
        {
          name: '1.pdf',
          file_number: '1'
        }
      ],
      number_of_files: '1'
    })
  }
}

export const mapProductDetails = lmsProductDetails => {}
