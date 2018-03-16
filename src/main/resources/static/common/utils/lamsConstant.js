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
		ALL : {
			id : -1,
			value : 'All'
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
			id : 2,
			value : "Both"
		}
	},
	ErrorMessage : {
		SOMETHING_WENT_WRONG : "Something Went Wrong !",
		UN_AUTHORIZED : "Unauthorized ! Please Login Again.",
		BAD_REQUEST : "Invalid Request !"
	},
	TOKEN : "TOKEN",
	AddressType : {
		PERMANENT : 1,
		COMMUNICATION : 2
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
		PERSONAL_LOAN : 26
	}
});