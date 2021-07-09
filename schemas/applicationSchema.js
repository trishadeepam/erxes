import { values } from 'lodash'
import {
  PRODUCT_TYPES,
  DOCUMENT_TYPES,
  BORROWER_TYPES,
  INTEREST_FREQUENCIES
} from '../plugins/loanApplication/api/pluginConstants'
const applicationSchema = {
  $schema: 'http://json-schema.org/draft-06/schema',
  $id: 'http://example.com/example.json',
  type: 'object',
  title: 'The root schema',
  description: 'The root schema comprises the entire JSON document.',
  default: {},
  examples: [
    {
      _id: '60e44fc2713c2fccf3a16837',
      userId: 'HRmTorAeB9BoBLEW9',
      modifiedBy: 'HRmTorAeB9BoBLEW9',
      createdAt: '2021-07-06T12:42:42.949Z',
      primaryBorrowerId: 'z4e3KhEgGHrNrSxaN',
      coBorrowerId: 'zLfCoELuorCtpwCtS',
      companyId: 'y6kpeKFc3LkeMrFX7',
      softCreditId: 'bBixnbLcz',
      productType: 'shortterm',
      bureauCreditScoreRefId: 'o2fCaL6M3',
      applicationDocuments: [
        {
          documentType: 'pan',
          documentName: 'pan',
          documentRefId: 'DCo836',
          documentVerified: true,
          documentVerificationDetails: {
            verified: true,
            verificationSource: 'Karxxa'
          }
        },
        {
          documentType: 'udyam',
          documentName: 'udyam',
          documentRefId: 'QikhxF',
          documentVerified: true,
          documentVerificationDetails: {
            verified: true,
            verificationSource: 'Karxxa'
          }
        },
        {
          documentType: 'sne',
          documentName: 'sne',
          documentRefId: 'Wwgrca',
          documentVerified: true,
          documentVerificationDetails: {
            verified: true,
            verificationSource: 'Karxxa'
          }
        },
        {
          documentType: 'mobile-bill',
          documentName: 'mobile-bill',
          documentRefId: 'DQzKkw',
          documentVerified: true,
          documentVerificationDetails: {
            verified: true,
            verificationSource: 'Karxxa'
          }
        },
        {
          documentType: 'bank-statement',
          documentName: 'bank-statement',
          documentRefId: 'PvGTP8',
          documentVerified: true,
          documentVerificationDetails: {
            verified: true,
            verificationSource: 'Karxxa'
          }
        }
      ],
      borrowerType: 'retailer',
      loanOffers: [
        {
          loanProduct: '100 Day Loan',
          productCode: '9885',
          loanAmount: 500000,
          interestRate: 2.5,
          interestFrequency: 'per-month',
          loanOfferStage: 'revised',
          loanOfferDate: '2021-07-06T12:42:42.874Z',
          lender: 'NP'
        },
        {
          loanProduct: '100 Day Loan',
          productCode: '9885',
          loanAmount: 100000,
          interestRate: 2.5,
          interestFrequency: 'per-month',
          loanOfferStage: 'revised',
          loanOfferDate: '2021-07-06T12:42:42.874Z',
          lender: 'NP'
        },
        {
          loanProduct: '100 Day Loan',
          productCode: '9885',
          loanAmount: 125000,
          interestRate: 2.5,
          interestFrequency: 'per-month',
          loanOfferStage: 'revised',
          loanOfferDate: '2021-07-06T12:42:42.874Z',
          lender: 'NP'
        },
        {
          loanProduct: '100 Day Loan',
          productCode: '9885',
          loanAmount: 150000,
          interestRate: 2.5,
          interestFrequency: 'per-month',
          loanOfferStage: 'revised',
          loanOfferDate: '2021-07-06T12:42:42.874Z',
          lender: 'NP'
        },
        {
          loanProduct: '100 Day Loan',
          productCode: '9885',
          loanAmount: 200000,
          interestRate: 2.5,
          interestFrequency: 'per-month',
          loanOfferStage: 'revised',
          loanOfferDate: '2021-07-06T12:42:42.874Z',
          lender: 'NP'
        }
      ],
      currentLoanOffer: {
        loanProduct: '100 Day Loan',
        productCode: '9885',
        loanAmount: 200000,
        interestRate: 2.5,
        interestFrequency: 'per-month',
        loanOfferStage: 'final',
        loanOfferDate: '2021-07-06T12:42:42.874Z',
        lender: 'NP'
      },
      stages: [
        {
          currentStage: 'PD',
          stageChangeDate: '2021-07-06T12:42:42.874Z',
          stateSuccess: 'success'
        },
        {
          currentStage: 'PD',
          stageChangeDate: '2021-07-06T12:42:42.874Z',
          stateSuccess: 'success'
        }
      ],
      currentStage: {
        currentStage: 'PD',
        stageChangeDate: '2021-07-06T12:42:42.874Z',
        stateSuccess: 'success'
      },
      statusChangeDate: '2021-07-06T12:42:42.874Z',
      applicationStatus: 'active',
      creditScore: {
        creditScore: 700,
        scoreSource: 'CIBIL',
        createdAt: '2021-07-06T12:42:42.874Z',
        scoreType: 'soft'
      },
      integrationId: 'HZcCyzySGzCfTpDtK',
      applicationNumber: 'RET1014',
      updatedAt: '2021-07-06T12:42:42.949Z'
    }
  ],
  required: [
    'userId',
    'modifiedBy',
    'createdAt',
    'primaryBorrowerId',
    'coBorrowerId',
    'companyId',
    'softCreditId',
    'productType',
    'bureauCreditScoreRefId',
    'applicationDocuments',
    'borrowerType',
    'loanOffers',
    'currentLoanOffer',
    'stages',
    'currentStage',
    'statusChangeDate',
    'applicationStatus',
    'creditScore',
    'integrationId',
    'applicationNumber',
    'updatedAt'
  ],
  properties: {
    userId: {
      $id: '#/properties/userId',
      type: 'string',
      title: 'Id of the User',
      description: 'Id of the user who created this application.',
      default: '',
      examples: ['HRmTorAeB9BoBLEW9']
    },
    modifiedBy: {
      $id: '#/properties/modifiedBy',
      type: 'string',
      title: 'Modified User',
      description: 'Id of user who modified the application.',
      default: '',
      examples: ['HRmTorAeB9BoBLEW9']
    },
    createdAt: {
      $id: '#/properties/createdAt',
      type: 'string',
      format: 'date-time',
      title: 'Created Date',
      description: 'Created Date.',
      default: '',
      examples: ['2021-07-06T12:42:42.949Z']
    },
    primaryBorrowerId: {
      $id: '#/properties/primaryBorrowerId',
      type: 'string',
      title: 'Primary borrower',
      description: 'Primary borrower id',
      default: '',
      examples: ['z4e3KhEgGHrNrSxaN']
    },
    coBorrowerId: {
      $id: '#/properties/coBorrowerId',
      type: 'string',
      title: 'Co Borrower',
      description: 'Co Borrower Id',
      default: '',
      examples: ['zLfCoELuorCtpwCtS']
    },
    companyId: {
      $id: '#/properties/companyId',
      type: 'string',
      title: 'Borrower Company',
      description: 'Brrower Company Id',
      default: '',
      examples: ['y6kpeKFc3LkeMrFX7']
    },
    softCreditId: {
      $id: '#/properties/softCreditId',
      type: 'string',
      title: 'Soft Credit Id',
      description: 'Reference to soft credit data in cerdit service',
      default: '',
      examples: ['bBixnbLcz']
    },
    productType: {
      $id: '#/properties/productType',
      type: 'string',
      title: 'Product Type',
      description: 'Product Type.',
      enum: values(PRODUCT_TYPES),
      default: '',
      examples: ['shortterm']
    },
    bureauCreditScoreRefId: {
      $id: '#/properties/bureauCreditScoreRefId',
      type: 'string',
      title: 'Credit bureau score ref id',
      description: 'Reference ID of credit score data',
      default: '',
      examples: ['o2fCaL6M3']
    },
    applicationDocuments: {
      $id: '#/properties/applicationDocuments',
      type: 'array',
      title: 'Application Documents',
      description: 'All the application documents',
      default: [],
      examples: [
        [
          {
            documentType: 'pan',
            documentName: 'pan',
            documentRefId: 'DCo836',
            documentVerified: true,
            documentVerificationDetails: {
              verified: true,
              verificationSource: 'Karxxa'
            }
          },
          {
            documentType: 'udyam',
            documentName: 'udyam',
            documentRefId: 'QikhxF',
            documentVerified: true,
            documentVerificationDetails: {
              verified: true,
              verificationSource: 'Karxxa'
            }
          }
        ]
      ],
      additionalItems: true,
      items: {
        type: 'object',
        default: {},
        examples: [
          {
            documentType: 'pan',
            documentName: 'pan',
            documentRefId: 'DCo836',
            documentVerified: true,
            documentVerificationDetails: {
              verified: true,
              verificationSource: 'Karxxa'
            }
          }
        ],
        required: [
          'documentType',
          'documentRefId',
          'documentVerified',
          'documentVerificationDetails'
        ],
        properties: {
          documentType: {
            $id:
              '#/properties/applicationDocuments/items/anyOf/0/properties/documentType',
            type: 'string',
            title: 'Type of Document',
            description: 'Type of Document',
            enum: values(DOCUMENT_TYPES),
            default: '',
            examples: ['pan']
          },
          documentRefId: {
            $id:
              '#/properties/applicationDocuments/items/anyOf/0/properties/documentRefId',
            type: 'string',
            title: 'Document Ref Id',
            description: 'Reference of document in document mgmt system.',
            default: '',
            examples: ['DCo836']
          },
          documentVerified: {
            $id:
              '#/properties/applicationDocuments/items/anyOf/0/properties/documentVerified',
            type: 'boolean',
            title: 'Document Verified?',
            description: 'Is document verified',
            default: false,
            examples: [true]
          },
          documentVerificationDetails: {
            $id:
              '#/properties/applicationDocuments/items/anyOf/0/properties/documentVerificationDetails',
            type: 'object',
            title: 'Document Verification Details',
            description: 'Details of the document verification',
            default: {},
            examples: [
              {
                verificationSource: 'Karxxa'
              }
            ],
            required: ['verified', 'verificationSource'],
            properties: {
              verificationSource: {
                $id:
                  '#/properties/applicationDocuments/items/anyOf/0/properties/documentVerificationDetails/properties/verificationSource',
                type: 'string',
                title: 'Source of Verification',
                description:
                  'Source of document verification such as manual, karza etc',
                default: '',
                examples: ['Karxxa']
              }
            },
            additionalProperties: true
          }
        },
        additionalProperties: true
      }
    },
    borrowerType: {
      $id: '#/properties/borrowerType',
      type: 'string',
      title: 'The borrower Type',
      description: 'Type of borrower',
      enum: values(BORROWER_TYPES),
      default: '',
      examples: ['retailer']
    },
    loanOffers: {
      $id: '#/properties/loanOffers',
      type: 'array',
      title: 'Loan Offers History',
      description: 'History of multiple loan offers',
      default: [],
      examples: [
        [
          {
            loanProduct: '100 Day Loan',
            productCode: '9885',
            loanAmount: 500000,
            interestRate: 2.5,
            interestFrequency: 'per-month',
            loanOfferStage: 'revised',
            loanOfferDate: '2021-07-06T12:42:42.874Z',
            lender: 'NP'
          },
          {
            loanProduct: '100 Day Loan',
            productCode: '9885',
            loanAmount: 100000,
            interestRate: 2.5,
            interestFrequency: 'per-month',
            loanOfferStage: 'revised',
            loanOfferDate: '2021-07-06T12:42:42.874Z',
            lender: 'NP'
          }
        ]
      ],
      additionalItems: true,
      items: {
        $id: '#/properties/loanOffers/items/anyOf/0',
        type: 'object',
        default: {},
        examples: [
          {
            loanProduct: '100 Day Loan',
            productCode: '9885',
            loanAmount: 500000,
            interestRate: 2.5,
            interestFrequency: 'per-month',
            loanOfferStage: 'revised',
            loanOfferDate: '2021-07-06T12:42:42.874Z',
            lender: 'NP'
          }
        ],
        required: [
          'loanProduct',
          'productCode',
          'loanAmount',
          'interestRate',
          'interestFrequency',
          'loanOfferStage',
          'loanOfferDate',
          'lender'
        ],
        properties: {
          loanProduct: {
            $id: '#/properties/loanOffers/items/anyOf/0/properties/loanProduct',
            type: 'string',
            title: 'Loan Product Name',
            description: 'Name of loan product',
            default: '',
            examples: ['100 Day Loan']
          },
          productCode: {
            $id: '#/properties/loanOffers/items/anyOf/0/properties/productCode',
            type: 'string',
            title: 'The product Code',
            description: 'Product Code',
            default: '',
            examples: ['9885']
          },
          loanAmount: {
            $id: '#/properties/loanOffers/items/anyOf/0/properties/loanAmount',
            type: 'integer',
            title: 'Loan Amount',
            description: 'Loan Amount',
            default: 0,
            minimum: 50000,
            maximum: 500000,
            examples: [500000]
          },
          interestRate: {
            $id:
              '#/properties/loanOffers/items/anyOf/0/properties/interestRate',
            type: 'number',
            title: 'Interest Rate',
            description: 'Interest Rate Value',
            default: 0.0,
            minimum: 0,
            maximum: 100,
            examples: [2.5]
          },
          interestFrequency: {
            $id:
              '#/properties/loanOffers/items/anyOf/0/properties/interestFrequency',
            type: 'string',
            title: 'Interest period',
            description: 'Interest calculation period',
            enum: INTEREST_FREQUENCIES,
            default: '',
            examples: ['per-month']
          },
          loanOfferStage: {
            $id:
              '#/properties/loanOffers/items/anyOf/0/properties/loanOfferStage',
            type: 'string',
            title: 'The loanOfferStage schema',
            description: 'An explanation about the purpose of this instance.',
            default: '',
            examples: ['revised']
          },
          loanOfferDate: {
            $id:
              '#/properties/loanOffers/items/anyOf/0/properties/loanOfferDate',
            type: 'string',
            title: 'The loanOfferDate schema',
            description: 'An explanation about the purpose of this instance.',
            default: '',
            examples: ['2021-07-06T12:42:42.874Z']
          },
          lender: {
            $id: '#/properties/loanOffers/items/anyOf/0/properties/lender',
            type: 'string',
            title: 'The lender schema',
            description: 'An explanation about the purpose of this instance.',
            default: '',
            examples: ['NP']
          }
        },
        additionalProperties: true
      }
    },
    currentLoanOffer: {
      $id: '#/properties/currentLoanOffer',
      type: 'object',
      title: 'The currentLoanOffer schema',
      description: 'An explanation about the purpose of this instance.',
      default: {},
      examples: [
        {
          loanProduct: '100 Day Loan',
          productCode: '9885',
          loanAmount: 200000,
          interestRate: 2.5,
          interestFrequency: 'per-month',
          loanOfferStage: 'final',
          loanOfferDate: '2021-07-06T12:42:42.874Z',
          lender: 'NP'
        }
      ],
      required: [
        'loanProduct',
        'productCode',
        'loanAmount',
        'interestRate',
        'interestFrequency',
        'loanOfferStage',
        'loanOfferDate',
        'lender'
      ],
      properties: {
        loanProduct: {
          $id: '#/properties/currentLoanOffer/properties/loanProduct',
          type: 'string',
          title: 'The loanProduct schema',
          description: 'An explanation about the purpose of this instance.',
          default: '',
          examples: ['100 Day Loan']
        },
        productCode: {
          $id: '#/properties/currentLoanOffer/properties/productCode',
          type: 'string',
          title: 'The productCode schema',
          description: 'An explanation about the purpose of this instance.',
          default: '',
          examples: ['9885']
        },
        loanAmount: {
          $id: '#/properties/currentLoanOffer/properties/loanAmount',
          type: 'integer',
          title: 'The loanAmount schema',
          description: 'An explanation about the purpose of this instance.',
          default: 0,
          examples: [200000]
        },
        interestRate: {
          $id: '#/properties/currentLoanOffer/properties/interestRate',
          type: 'number',
          title: 'The interestRate schema',
          description: 'An explanation about the purpose of this instance.',
          default: 0.0,
          examples: [2.5]
        },
        interestFrequency: {
          $id: '#/properties/currentLoanOffer/properties/interestFrequency',
          type: 'string',
          title: 'The interestFrequency schema',
          description: 'An explanation about the purpose of this instance.',
          default: '',
          examples: ['per-month']
        },
        loanOfferStage: {
          $id: '#/properties/currentLoanOffer/properties/loanOfferStage',
          type: 'string',
          title: 'The loanOfferStage schema',
          description: 'An explanation about the purpose of this instance.',
          default: '',
          examples: ['final']
        },
        loanOfferDate: {
          $id: '#/properties/currentLoanOffer/properties/loanOfferDate',
          type: 'string',
          title: 'The loanOfferDate schema',
          description: 'An explanation about the purpose of this instance.',
          default: '',
          examples: ['2021-07-06T12:42:42.874Z']
        },
        lender: {
          $id: '#/properties/currentLoanOffer/properties/lender',
          type: 'string',
          title: 'The lender schema',
          description: 'An explanation about the purpose of this instance.',
          default: '',
          examples: ['NP']
        }
      },
      additionalProperties: true
    },
    stages: {
      $id: '#/properties/stages',
      type: 'array',
      title: 'The stages schema',
      description: 'An explanation about the purpose of this instance.',
      default: [],
      examples: [
        [
          {
            currentStage: 'PD',
            stageChangeDate: '2021-07-06T12:42:42.874Z',
            stateSuccess: 'success'
          },
          {
            currentStage: 'PD',
            stageChangeDate: '2021-07-06T12:42:42.874Z',
            stateSuccess: 'success'
          }
        ]
      ],
      additionalItems: true,
      items: {
        $id: '#/properties/stages/items',
        anyOf: [
          {
            $id: '#/properties/stages/items/anyOf/0',
            type: 'object',
            title: 'The first anyOf schema',
            description: 'An explanation about the purpose of this instance.',
            default: {},
            examples: [
              {
                currentStage: 'PD',
                stageChangeDate: '2021-07-06T12:42:42.874Z',
                stateSuccess: 'success'
              }
            ],
            required: ['currentStage', 'stageChangeDate', 'stateSuccess'],
            properties: {
              currentStage: {
                $id:
                  '#/properties/stages/items/anyOf/0/properties/currentStage',
                type: 'string',
                title: 'The currentStage schema',
                description:
                  'An explanation about the purpose of this instance.',
                default: '',
                examples: ['PD']
              },
              stageChangeDate: {
                $id:
                  '#/properties/stages/items/anyOf/0/properties/stageChangeDate',
                type: 'string',
                title: 'The stageChangeDate schema',
                description:
                  'An explanation about the purpose of this instance.',
                default: '',
                examples: ['2021-07-06T12:42:42.874Z']
              },
              stateSuccess: {
                $id:
                  '#/properties/stages/items/anyOf/0/properties/stateSuccess',
                type: 'string',
                title: 'The stateSuccess schema',
                description:
                  'An explanation about the purpose of this instance.',
                default: '',
                examples: ['success']
              }
            },
            additionalProperties: true
          }
        ]
      }
    },
    currentStage: {
      $id: '#/properties/currentStage',
      type: 'object',
      title: 'The currentStage schema',
      description: 'An explanation about the purpose of this instance.',
      default: {},
      examples: [
        {
          currentStage: 'PD',
          stageChangeDate: '2021-07-06T12:42:42.874Z',
          stateSuccess: 'success'
        }
      ],
      required: ['currentStage', 'stageChangeDate', 'stateSuccess'],
      properties: {
        currentStage: {
          $id: '#/properties/currentStage/properties/currentStage',
          type: 'string',
          title: 'The currentStage schema',
          description: 'An explanation about the purpose of this instance.',
          default: '',
          examples: ['PD']
        },
        stageChangeDate: {
          $id: '#/properties/currentStage/properties/stageChangeDate',
          type: 'string',
          title: 'The stageChangeDate schema',
          description: 'An explanation about the purpose of this instance.',
          default: '',
          examples: ['2021-07-06T12:42:42.874Z']
        },
        stateSuccess: {
          $id: '#/properties/currentStage/properties/stateSuccess',
          type: 'string',
          title: 'The stateSuccess schema',
          description: 'An explanation about the purpose of this instance.',
          default: '',
          examples: ['success']
        }
      },
      additionalProperties: true
    },
    statusChangeDate: {
      $id: '#/properties/statusChangeDate',
      type: 'string',
      title: 'The statusChangeDate schema',
      description: 'An explanation about the purpose of this instance.',
      default: '',
      examples: ['2021-07-06T12:42:42.874Z']
    },
    applicationStatus: {
      $id: '#/properties/applicationStatus',
      type: 'string',
      title: 'The applicationStatus schema',
      description: 'An explanation about the purpose of this instance.',
      default: '',
      examples: ['active']
    },
    creditScore: {
      $id: '#/properties/creditScore',
      type: 'object',
      title: 'The creditScore schema',
      description: 'An explanation about the purpose of this instance.',
      default: {},
      examples: [
        {
          creditScore: 700,
          scoreSource: 'CIBIL',
          createdAt: '2021-07-06T12:42:42.874Z',
          scoreType: 'soft'
        }
      ],
      required: ['creditScore', 'scoreSource', 'createdAt', 'scoreType'],
      properties: {
        creditScore: {
          $id: '#/properties/creditScore/properties/creditScore',
          type: 'integer',
          title: 'The creditScore schema',
          description: 'An explanation about the purpose of this instance.',
          default: 0,
          examples: [700]
        },
        scoreSource: {
          $id: '#/properties/creditScore/properties/scoreSource',
          type: 'string',
          title: 'The scoreSource schema',
          description: 'An explanation about the purpose of this instance.',
          default: '',
          examples: ['CIBIL']
        },
        createdAt: {
          $id: '#/properties/creditScore/properties/createdAt',
          type: 'string',
          title: 'The createdAt schema',
          description: 'An explanation about the purpose of this instance.',
          default: '',
          examples: ['2021-07-06T12:42:42.874Z']
        },
        scoreType: {
          $id: '#/properties/creditScore/properties/scoreType',
          type: 'string',
          title: 'The scoreType schema',
          description: 'An explanation about the purpose of this instance.',
          default: '',
          examples: ['soft']
        }
      },
      additionalProperties: true
    },
    integrationId: {
      $id: '#/properties/integrationId',
      type: 'string',
      title: 'The integrationId schema',
      description: 'An explanation about the purpose of this instance.',
      default: '',
      examples: ['HZcCyzySGzCfTpDtK']
    },
    applicationNumber: {
      $id: '#/properties/applicationNumber',
      type: 'string',
      title: 'The applicationNumber schema',
      description: 'An explanation about the purpose of this instance.',
      default: '',
      examples: ['RET1014']
    },
    updatedAt: {
      $id: '#/properties/updatedAt',
      type: 'string',
      title: 'The updatedAt schema',
      description: 'An explanation about the purpose of this instance.',
      default: '',
      examples: ['2021-07-06T12:42:42.949Z']
    }
  },
  additionalProperties: true
}
