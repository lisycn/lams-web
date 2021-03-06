app.constant('Constant', {
	UserType : {
		LENDER : {
			id : 1,
			value : 'Lender'
		},
		BORROWER : {
			id : 2,
			value : 'Borrower'
		},
		CHANNEL_PARTNER : {
			id : 3,
			value : 'Channel Partner'
		},
		ALL : {
			id : -1,
			value : 'All'
		}
	}, mode : {
		VIEW : "view",
		EDIT : "edit"
	},
	Template : {
		SMS  : "sms.ftl"
	},
	OTPType : {
		Registration : {
			id : 26,
			Value : "Registration",
			code : "RG"
		}
	},
	Mode : {
		ACTIVE :{
			id : 0,
			value : "Active"
		},INACTIVE :{
			id : 1,
			value : "INActive"
		},BOTH :{
			id : -1,
			value : "Both"
		}
	},
	ErrorMessage : {
		SOMETHING_WENT_WRONG : "Something Went Wrong !",
		UN_AUTHORIZED : "Unauthorized ! Please Login Again.",
		BAD_REQUEST : "Invalid Request !"
	},
	TOKEN : "TOKEN",
	USER_TYPE : "UT",
	AddressType : {
		PERMANENT : 1,
		COMMUNICATION : 2,
		EMPLOYMENT_ADD : 3
	},
	LoanType : {
		EXISTING_LOAN : 22,
		CLOSED_LOAN : 25,
		CURRENT_LOAN : 23
	},
	ApplicationType : {
		HOME_LOAN : 5,
		LOAN_AGAINST_PROPERTY : 6,
		SECURED_BUSINESS_LOAN : 7,
		WORKING_CAPITAL_LOAN : 8,
		EDUCATION_LOAN : 9,
		CAR_LOAN : 10,
		OVERDRAFT_FACILITIES_LOAN : 11,
		DROPLINE_OVERDRAFT_FACILITIES_LOAN : 12,
		BANK_GUARANTEE_LOAN : 13,
		CC_FACILITIES_LOAN : 14,
		TERM_LOAN : 15,
		LOAN_AGAINST_FDS : 16,
		LOAN_AGAINST_SECURITIS : 17,
		PROJECT_FINANCE_LOAN : 18,
		PRIVATE_EQUITY_FINANCE_LOAN : 19,
		GOLD_LOAN : 20,
		OTHER_LOAN : 21,
		PERSONAL_LOAN : 27
	}, 
	ApplicationTypeCode : {
		HOME_LOAN : "HL",
		LOAN_AGAINST_PROPERTY : "LAP",
		SECURED_BUSINESS_LOAN : "SBL",
		WORKING_CAPITAL_LOAN : "WC",
		EDUCATION_LOAN : "EL",
		CAR_LOAN : "CL",
		OVERDRAFT_FACILITIES_LOAN : "ODL",
		DROPLINE_OVERDRAFT_FACILITIES_LOAN : "DLOF",
		BANK_GUARANTEE_LOAN : "BG",
		CC_FACILITIES_LOAN : "CCF",
		TERM_LOAN : "TL",
		LOAN_AGAINST_FDS : "LAF",
		LOAN_AGAINST_SECURITIS : "LAS",
		PROJECT_FINANCE_LOAN : "PFL",
		PRIVATE_EQUITY_FINANCE_LOAN : "PEF",
		GOLD_LOAN : "GL",
		OTHER_LOAN : "OL",
		PERSONAL_LOAN : "PL"
	}, documentType : {
		PAN_CARD : 1,
		AADHAR_CARD : 2,
		LAST_3_MONTH_SALARY_SLIP : 3,
		LAST_6_MONTHS_BANK_ACCOUNT_STATEMENT : 4,
		FORM_16_OR_APPOIMENT_LETTER : 5,
		INVESTMENT_PROOFS : 6,
		EXISTING_LOAN_DOCUMENT : 7,
		OTHER_DOCUMENT : 8,
		PHOTO_GRAPH : 9,
		CORPORATE_ITR_SET_YEAR1 : 10,
		CORPORATE_ITR_SET_YEAR2 : 11,
		CORPORATE_ITR_SET_YEAR3 : 12,
		CORPORATE_BANK_ACCOUNT_STATEMENT : 13,
		INDIVIDUAL_ITR_SET_YEAR1 : 14,
		INDIVIDUAL_ITR_SET_YEAR2 : 15,
		INDIVIDUAL_ITR_SET_YEAR3 : 16,
		INDIVIDUAL_BANK_ACCOUNT_STATEMENT : 17
	},EmploymentType : {
		SALARIED : 1,
		SELF_EMPLOYED : 2
	},
	Status :  {
		OPEN : "OPEN",
		RESPONDED : "RESPONDED",
		ACCEPTED : "ACCEPTED",
		REJECTED : "REJECTED",
		NOTINTERESTED : "NOTINTERESTED"
	},
	CURRENCY : {
		IND : 'IND',
		DLR : 'DLR'
	}
});