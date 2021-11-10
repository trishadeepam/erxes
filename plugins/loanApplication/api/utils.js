const field = (options) => options
const createConformity = async (models, {
  companyIds, customerIds, mainType, mainTypeId
}) => {
  for (const companyId of companyIds || []) {
    await models.Conformities.addConformity({
      mainType,
      mainTypeId,
      relType: 'company',
      relTypeId: companyId
    })
  }

  for (const customerId of customerIds || []) {
    await models.Conformities.addConformity({
      mainType,
      mainTypeId,
      relType: 'customer',
      relTypeId: customerId
    })
  }
}

const generateApplicationNumber = (application, sequence) => {
  return `${application.borrowerType.substring(0, 3).toUpperCase()}${sequence}`
}

export default {
  generateApplicationNumber,
  createConformity,
  field
}
