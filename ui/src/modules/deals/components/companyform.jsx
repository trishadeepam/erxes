import React from "react";
import JSONSchemaForm from "react-jsonschema-form";
import "bootstrap/dist/css/bootstrap.css";

const companyPostSchema = {
    type: "object",
    properties: {
        title: {
            title: "Business Name",
            type: "string",
            minLength: 10,
            maxLength: 140,
            readOnly: true
        },
        location: {
            title: "Store Location",
            type: "string",
            pattern: "^[a-z0-9-]+$",
            readOnly: true
        },
        owned: {
            title: "Owned / Rented",
            type: "string",
            pattern: "^(\\+\\d{1,3}[- ]?)?\\d{10}$",
            readOnly: true
        },
        store_size: {
            title: "Store Size",
            type: "string",
            pattern: "[A-Z]{5}[0-9]{4}[A-Z]{1}",
            readOnly: true
        },
        total_stores: {
            title: "Total Stores",
            type: "string",
            readOnly: true
        },
        earning_members: {
            title: "Total Earning Members",
            type: "string",
            readOnly: true
        },
        monthly_income: {
            title: "Total Monthly Income",
            type: "string",
            readOnly: true
        },
        shop_address:{
            title: "Shop Address",
            type: "string",
            readOnly: true
        }

    },
    required: []
};

export {companyPostSchema};

export default function Form({ onSubmit }) {
    return (
        <div class="container">
            <div class="row">
                <div class="col-md-6">
                    <JSONSchemaForm onSubmit={onSubmit} schema={companyPostSchema} />
                </div>
            </div>
        </div>
    );
}
