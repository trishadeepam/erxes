import EditForm from 'modules/boards/components/editForm/EditForm';
import Left from 'modules/boards/components/editForm/Left';
import Sidebar from 'modules/boards/components/editForm/Sidebar';
import Top from 'modules/boards/components/editForm/Top';
import {
  FlexContent,
  HeaderContentSmall,
  HeaderRowSmall
} from 'modules/boards/styles/item';
import { IEditFormContent, IItem, IOptions } from 'modules/boards/types';
import ControlLabel from 'modules/common/components/form/Label';
import { Tabs, TabTitle } from 'modules/common/components/tabs';
import { __ } from 'modules/common/utils';
import ProductSection from 'modules/deals/components/ProductSection';
import { IProduct } from 'modules/settings/productService/types';
import PortableTasks from 'modules/tasks/components/PortableTasks';
import PortableTickets from 'modules/tickets/components/PortableTickets';
import { pluginsOfItemSidebar } from 'pluginUtils';
import React from 'react';
import { IDeal, IDealParams, IPaymentsData } from '../types';
import Form from '@rjsf/bootstrap-4';
import { customerPostSchema } from './form';
import { companyPostSchema } from './companyform';
import { loanPostSchema } from './loanform';
import { agentPostSchema } from './agentform';

type Props = {
  options: IOptions;
  item: IDeal;
  addItem: (doc: IDealParams, callback: () => void) => void;
  saveItem: (doc: IDealParams, callback?: (item) => void) => void;
  copyItem: (itemId: string, callback: () => void) => void;
  onUpdate: (item, prevStageId?: string) => void;
  removeItem: (itemId: string, callback: () => void) => void;
  beforePopupClose: (afterPopupClose?: () => void) => void;
  sendToBoard?: (item: any) => void;
};
type StringState = {
  currentTab: string;
};

const divStyle = {
  background: '#F9F9F9',
  padding: '20px',
  margin: '20px'
};

type State = {
  amount: any;
  products: IProduct[];
  productsData: any;
  paymentsData: IPaymentsData;
  changePayData: IPaymentsData;
  updatedItem?: IItem;
} & StringState;

export default class DealEditForm extends React.Component<Props, State> {
  constructor(props) {
    super(props);

    const item = props.item;
    console.log(item);
    this.state = {
      amount: item.amount || {},
      productsData: item.products ? item.products.map(p => ({ ...p })) : [],
      // collecting data for ItemCounter component
      products: item.products ? item.products.map(p => p.product) : [],
      paymentsData: item.paymentsData,
      changePayData: {},
      currentTab: 'deal'
    };
  }

  onChange = (name: string, value: string) => {
    this.setState({ [name]: value } as Pick<StringState, keyof StringState>);
  };

  renderAmount = () => {
    const { amount } = this.state;

    if (Object.keys(amount).length === 0) {
      return null;
    }

    return (
      <HeaderContentSmall>
        <ControlLabel>Amount</ControlLabel>
        {Object.keys(amount).map(key => (
          <p key={key}>
            {amount[key].toLocaleString()} {key}
          </p>
        ))}
      </HeaderContentSmall>
    );
  };

  companyFormData = () => {
    const item = this.props.item;
    const businessDetails = item.loanApplication.businessDetails;

    return {
      title: businessDetails.businessName,
      location: 'Not in China',
      owned: 'rent',
      store_size: '',
      total_stores: '4',
      earning_members: '2',
      monthly_income: 400000,
      shop_address: JSON.stringify(businessDetails.businessAddress)
    };
  };

  customerFormData = () => {
    const item = this.props.item;
    const personalDetails = item.loanApplication.personalDetails;
    return {
      title: '',
      email: '',
      mobile: '',
      pan: '',
      dob: Date.parse(personalDetails.dob),
      gst: '',
      udyam: '',
      marital_status: personalDetails.marital_status,
      dependents: personalDetails.numberOfDependents,
      gender: personalDetails.sex,
      education: personalDetails.userEducation,
      religion: personalDetails.userEthnicity
    };
  };

  loanFormData = () => {
    const item = this.props.item;
    return {
      loan_amount: item.loanApplication.loanDetails.loanAmount,
      loan_purpose: item.loanApplication.loanDetails.loanPurpose,
      coborrower_name: '',
      coborrower_mobile: '',
      coborrower_relationship: '',
      coborrower_address: ''
    };
  };

  agentFormData = () => {
    return {
      name: 'Shanta Ram',
      location: 'Andheri',
      mobile: '8989898989'
    };
  };

  onChangeField = <T extends keyof State>(name: T, value: State[T]) => {
    this.setState({ [name]: value } as Pick<State, keyof State>);
  };

  saveProductsData = () => {
    const { productsData, paymentsData } = this.state;
    const { saveItem } = this.props;
    const products: IProduct[] = [];
    const amount: any = {};
    const filteredProductsData: any = [];

    productsData.forEach(data => {
      // products
      if (data.product) {
        if (data.currency) {
          // calculating item amount
          if (!amount[data.currency]) {
            amount[data.currency] = data.amount || 0;
          } else {
            amount[data.currency] += data.amount || 0;
          }
        }
        // collecting data for ItemCounter component
        products.push(data.product);
        data.productId = data.product._id;
        filteredProductsData.push(data);
      }
    });

    Object.keys(paymentsData || {}).forEach(key => {
      const perData = paymentsData[key];

      if (!perData.currency || !perData.amount || perData.amount === 0) {
        delete paymentsData[key];
      }
    });

    this.setState(
      { productsData: filteredProductsData, products, amount, paymentsData },
      () => {
        saveItem({ productsData, paymentsData }, updatedItem => {
          this.setState({ updatedItem });
        });
      }
    );
  };

  beforePopupClose = (afterPopupClose?: () => void) => {
    const { updatedItem } = this.state;
    const { onUpdate, beforePopupClose } = this.props;

    if (beforePopupClose) {
      beforePopupClose(() => {
        if (updatedItem && onUpdate) {
          onUpdate(updatedItem);
        }

        if (afterPopupClose) {
          afterPopupClose();
        }
      });
    }
  };

  renderProductSection = () => {
    const { products, productsData, paymentsData } = this.state;

    const pDataChange = pData => this.onChangeField('productsData', pData);
    const prsChange = prs => this.onChangeField('products', prs);
    const payDataChange = payData =>
      this.onChangeField('paymentsData', payData);

    return (
      <ProductSection
        onChangeProductsData={pDataChange}
        onChangeProducts={prsChange}
        onChangePaymentsData={payDataChange}
        productsData={productsData}
        paymentsData={paymentsData}
        products={products}
        saveProductsData={this.saveProductsData}
      />
    );
  };

  renderItems = () => {
    const { item } = this.props;
    return (
      <>
        <PortableTickets mainType="deal" mainTypeId={item._id} />
        <PortableTasks mainType="deal" mainTypeId={item._id} />
        {pluginsOfItemSidebar(item, 'deal')}
      </>
    );
  };

  renderFormContent = ({
    saveItem,
    onChangeStage,
    copy,
    remove
  }: IEditFormContent) => {
    const { item, options, onUpdate, addItem, sendToBoard } = this.props;
    const { currentTab } = this.state;
    const tabOnClick = (name: string) => {
      this.onChange('currentTab', name);
    };
    return (
      <>
        <Top
          options={options}
          amount={this.renderAmount}
          stageId={item.stageId}
          item={item}
          saveItem={saveItem}
          onChangeStage={onChangeStage}
        />
        <HeaderRowSmall>
          <Tabs full={true}>
            <TabTitle
              className={currentTab === 'deal' ? 'active' : ''}
              onClick={tabOnClick.bind(this, 'deal')}
            >
              {__('Deal Interaction')}
            </TabTitle>
            <TabTitle
              className={currentTab === 'company' ? 'active' : ''}
              onClick={tabOnClick.bind(this, 'company')}
            >
              {__('Company')}
            </TabTitle>
            <TabTitle
              className={currentTab === 'customer' ? 'active' : ''}
              onClick={tabOnClick.bind(this, 'customer')}
            >
              {__('Customer')}
            </TabTitle>
            <TabTitle
              className={currentTab === 'loan_details' ? 'active' : ''}
              onClick={tabOnClick.bind(this, 'loan_details')}
            >
              {__('Loan')}
            </TabTitle>
            <TabTitle
              className={currentTab === 'agent_details' ? 'active' : ''}
              onClick={tabOnClick.bind(this, 'agent_details')}
            >
              {__('Agent')}
            </TabTitle>
          </Tabs>
        </HeaderRowSmall>
        {currentTab === 'deal' && (
          <FlexContent>
            <Left
              options={options}
              saveItem={saveItem}
              copyItem={copy}
              removeItem={remove}
              onUpdate={onUpdate}
              sendToBoard={sendToBoard}
              item={item}
              addItem={addItem}
              onChangeStage={onChangeStage}
            />

            <Sidebar
              options={options}
              item={item}
              sidebar={this.renderProductSection}
              saveItem={saveItem}
              renderItems={this.renderItems}
            />
          </FlexContent>
        )}
        {currentTab === 'company' && (
          <div style={divStyle}>
            <Form
              schema={companyPostSchema}
              // uiSchema={uiSchema}
              //
              formData={this.companyFormData()}
            >
              <button type="submit" style={{ display: 'none' }} />
            </Form>
          </div>
        )}
        {currentTab === 'customer' && (
          <div style={divStyle}>
            <Form
              schema={customerPostSchema}
              // uiSchema={uiSchema}
              //
              formData={this.customerFormData()}
            >
              <button type="submit" style={{ display: 'none' }} />
            </Form>
          </div>
        )}

        {currentTab === 'loan_details' && (
          <div style={divStyle}>
            <Form
              schema={loanPostSchema}
              // uiSchema={uiSchema}
              //
              formData={this.loanFormData()}
            >
              <button type="submit" style={{ display: 'none' }} />
            </Form>
          </div>
        )}

        {currentTab === 'agent_details' && (
          <div style={divStyle}>
            <Form
              schema={agentPostSchema}
              // uiSchema={uiSchema}
              //
              formData={this.agentFormData()}
            >
              <button type="submit" style={{ display: 'none' }} />
            </Form>
          </div>
        )}
      </>
    );
  };

  render() {
    const extendedProps = {
      ...this.props,
      amount: this.renderAmount,
      sidebar: this.renderProductSection,
      formContent: this.renderFormContent,
      beforePopupClose: this.beforePopupClose
    };

    return <EditForm {...extendedProps} />;
  }
}
