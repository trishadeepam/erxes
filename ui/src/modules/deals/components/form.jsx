import React from "react";
import JSONSchemaForm from "react-jsonschema-form";
import "bootstrap/dist/css/bootstrap.css";

const customerPostSchema = {
    type: "object",
    properties: {
        title: {
            title: "Full Name",
            type: "string",
            minLength: 10,
            maxLength: 140,
            readOnly: true
        },
        email: {
            title: "Email",
            type: "string",
            pattern: "^[a-z0-9-]+$",
            readOnly: true
        },
        mobile: {
            title: "Mobile",
            type: "string",
            pattern: "^(\\+\\d{1,3}[- ]?)?\\d{10}$",
            readOnly: true
        },
        pan: {
            title: "Pan",
            type: "string",
            pattern: "[A-Z]{5}[0-9]{4}[A-Z]{1}",
            readOnly: true
        },
        dob: {
            title: "Date of Birth",
            type: "string",
            readOnly: true
        },
        gst: {
            title: "GST Number",
            type: "string",
            readOnly: true
        },
        udyam: {
            title: "Udyam Aadhaar Number",
            type: "string",
            readOnly: true
        },
        marital_status: {
            title: "Marital Status",
            type: "string",
            readOnly: true
        },
        dependents: {
            title: "Total Dependents",
            type: "string",
            readOnly: true
        },
        gender: {
            title: "Gender",
            type: "string",
            readOnly: true
        },
        education: {
            title: "Highest Education",
            type: "string",
            readOnly: true
        },
        religion: {
            title: "Religion",
            type: "string",
            readOnly: true
        }


    },
    required: []
};

export {customerPostSchema};

export default function Form({ onSubmit }) {
    return (
        <div class="container" >
            <div class="row">
                <div class="col-md-6" >
                    <JSONSchemaForm onSubmit={onSubmit} schema={customerPostSchema} />
                </div>
            </div>
        </div>
    );
}
