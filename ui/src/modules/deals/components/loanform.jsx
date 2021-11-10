import React from "react";
import JSONSchemaForm from "react-jsonschema-form";
import "bootstrap/dist/css/bootstrap.css";

const loanPostSchema = {
    type: "object",
    properties: {
        loan_amount: {
            title: "Loan Amount",
            type: "string",
            minLength: 10,
            maxLength: 140,
            readOnly: true
        },
        loan_purpose: {
            title: "Loan Purpose",
            type: "string",
            pattern: "^[a-z0-9-]+$",
            readOnly: true
        },
        coborrower_name: {
            title: "Coborrower Name",
            type: "string",
            pattern: "^(\\+\\d{1,3}[- ]?)?\\d{10}$",
            readOnly: true
        },
        coborrower_mobile: {
            title: "Coborrower Mobile Number",
            type: "string",
            pattern: "[A-Z]{5}[0-9]{4}[A-Z]{1}",
            readOnly: true
        },
        coborrower_relationship: {
            title: "Co-borrower's Relationship with Borrower",
            type: "string",
            readOnly: true
        },
        coborrower_address: {
            title: "Co-borrower's Address",
            type: "string",
            readOnly: true
        }

    },
    required: []
};

export {loanPostSchema};

export default function Form({ onSubmit }) {
    return (
        <div class="container">
            <div class="row">
                <div class="col-md-6">
                    <JSONSchemaForm onSubmit={onSubmit} schema={loanPostSchema} />
                </div>
            </div>
        </div>
    );
}
