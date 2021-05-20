const { ObjectId } = require('bson');
const { timeStamp } = require('console');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const personalDetail = {
    title: {
        type: String,
        default: ''
    },
    fullName: {
        type: String,
        default: ''
    },
    IC: {
        type: Number,
        default: ''
    },
    DOB: {
        type: Date,
        default: ''
    },
    gender: {
        type: String,
        default: ''
    },
    maritalStatus: {
        type: String,
        default: ''
    },
    contactNo: {
        type: Number,
        default: ''
    },
    email: {
        type: String,
        default: ''
    },
    nationality: {
        type: String,
        default: ''
    },
    race: {
        type: String,
        default: ''
    },
    address: {
        type: String,
        default: ''
    },
    propertyType: {
        type: String,
        default: ''
    },
    homeOwnership: {
        type: String,
        default: ''
    },
    educationLevel: {
        type: String,
        default: ''
    },
    occupation: {
        type: String,
        default: ''
    },
};

const financialReportSchema = new Schema({
    _id: {
        type: String,
        required: true
    },
    clientName: {
        type: String,
        required: true
    },
    agentInfo: {
        factFindDate: {
            type: Date,
            required: true
        },
        name: {
            type: String,
            default: 'Amirrul Kasmirhan'
        },
        code: {
            type: Number,
            default: 14211
        },
        email: {
            type: String,
            default: 'amirrul.kasmirhan@aia.com.bn'
        },
        phone: {
            type: String,
            default: '+673 7306697'
        },
    },
    discloseAll: {
        type: Boolean,
        default: true
    },
    clientDetail: personalDetail,
    spouseDetail: personalDetail,
    dependants: [{
        name: {
            type: String,
            default: ''
        },
        relationship: {
            type: String,
            default: ''
        },
        sex: {
            type: String,
            default: ''
        },
        age: {
            type: Number,
            default: ''
        },
        duration: {
            type: Number,
            default: ''
        },
        income: {
            type: Number,
            default: ''
        },
    }],
    networth: {
        personalAssets: [{
            category: {
                type: String,
                default: ''
            },
            Amount: {
                type: Number,
                default: ''
            },
        }],
        investedAssets: [{
            category: {
                type: String,
                default: ''
            },
            Amount: {
                type: Number,
                default: ''
            },
        }],
        cashEquivalents: [{
            category: {
                type: String,
                default: ''
            },
            Amount: {
                type: Number,
                default: ''
            },
        }],
        liabilities: [{
            category: {
                type: String,
                default: ''
            },
            Amount: {
                type: Number,
                default: ''
            },
        }],
    },
    cashflow: {
        income: [{
            category: {
                type: String,
                default: ''
            },
            Amount: {
                type: Number,
                default: ''
            },
        }],
        investments: [{
            category: {
                type: String,
                default: ''
            },
            Amount: {
                type: Number,
                default: ''
            },
        }],
        expenses: [{
            category: {
                type: String,
                default: ''
            },
            Amount: {
                type: Number,
                default: ''
            },
        }],
        savings: [{
            category: {
                type: String,
                default: ''
            },
            Amount: {
                type: Number,
                default: ''
            },
        }],
        liabilities: [{
            category: {
                type: String,
                default: ''
            },
            Amount: {
                type: Number,
                default: ''
            },
        }],
    },
    riskPreference: {
        chosen: {
            type: String,
            default: ''
        },
        answers: {
            q1: {
                type: Number,
                default: '1'
            },
            q2: {
                type: Number,
                default: '2'
            },
            q3: {
                type: Number,
                default: '1'
            },
            q4: {
                type: Number,
                default: '3'
            },
            q5: {
                type: Number,
                default: '4'
            },
            q6: {
                type: Number,
                default: '2'
            },
            q7: {
                type: Number,
                default: '2'
            },
            q8: {
                type: Number,
                default: '1'
            },

        },
    },
    financialNeeds: {
        goals: [{
            name: {
                type: String,
                default: ''
            },
            targetAge: {
                type: Number,
                default: ''
            },
            monthlyDuration: {
                type: Number,
                default: ''
            },
            requiredAmount: {
                type: Number,
                default: ''
            }, Number,
            existingAmount: {
                type: Number,
                default: ''
            },
            requiredFutureSurplus: {
                type: Number,
                default: ''
            },
            note: {
                type: String,
                default: ''
            },
        }],
        priorities: {
            death: {
                priority: {
                    type: String,
                    default: ''
                },
                amount: {
                    type: Number,
                    default: ''
                },
                note: {
                    type: String,
                    default: ''
                },
            },
            disability: {
                income: {
                    type: Number,
                    default: ''
                },
                priority: {
                    type: String,
                    default: ''
                },
                amount: {
                    type: Number,
                    default: ''
                },
                note: {
                    type: String,
                    default: ''
                },
            },
            criticalIllness: {
                priority: {
                    type: String,
                    default: ''
                },
                amount: {
                    type: Number,
                    default: ''
                },
                note: {
                    type: String,
                    default: ''
                },
            },
            retirement: {
                age: {
                    type: Number,
                    default: ''
                },
                income: {
                    type: Number,
                    default: ''
                },
                priority: {
                    type: String,
                    default: ''
                },
                amount: {
                    type: Number,
                    default: ''
                },
                note: {
                    type: String,
                    default: ''
                },
            },
            childrenEducation: {
                priority: {
                    type: String,
                    default: ''
                },
                amount: {
                    type: Number,
                    default: ''
                },
                note: {
                    type: String,
                    default: ''
                },
            },
            hospitalisation: {
                priority: {
                    type: String,
                    default: ''
                },
                amount: {
                    type: Number,
                    default: ''
                },
                note: {
                    type: String,
                    default: ''
                },
            },
            oldAgeDisabilities: {
                priority: {
                    type: String,
                    default: ''
                },
                amount: {
                    type: Number,
                    default: ''
                },
                note: {
                    type: String,
                    default: ''
                },
            },
            incomeLoss: {
                priority: {
                    type: String,
                    default: ''
                },
                amount: {
                    type: Number,
                    default: ''
                },
                note: {
                    type: String,
                    default: ''
                },
            },
            accident: {
                priority: {
                    type: String,
                    default: ''
                },
                amount: {
                    type: Number,
                    default: ''
                },
                note: {
                    type: String,
                    default: ''
                },
            },
        }
    }
}, { timestamps: true, _id: false });

const FinancialReport = mongoose.model('Financial Report', financialReportSchema);

module.exports = FinancialReport;