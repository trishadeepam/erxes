import EditForm from 'modules/boards/components/editForm/EditForm';
import Left from 'modules/boards/components/editForm/Left';
import Sidebar from 'modules/boards/components/editForm/Sidebar';
import Top from 'modules/boards/components/editForm/Top';
import { FlexContent, HeaderRowSmall } from 'modules/boards/styles/item';
import {
  IEditFormContent,
  IItem,
  IItemParams,
  IOptions
} from 'modules/boards/types';
import { __ } from 'modules/common/utils';
import { Tabs, TabTitle } from 'modules/common/components/tabs';
import TaskTimer, { STATUS_TYPES } from 'modules/common/components/Timer';
import PortableDeals from 'modules/deals/components/PortableDeals';
// import PortableTickets from 'modules/tickets/components/PortableTickets';
import React from 'react';
import Form from '@rjsf/bootstrap-4';
import { cpvPostSchema } from './cpvform';

type Props = {
  options: IOptions;
  item: IItem;
  addItem: (doc: IItemParams, callback: () => void, msg?: string) => void;
  saveItem: (doc: IItemParams, callback?: (item) => void) => void;
  copyItem: (itemId: string, callback: () => void) => void;
  removeItem: (itemId: string, callback: () => void) => void;
  onUpdate: (item: IItem, prevStageId?: string) => void;
  updateTimeTrack: (
    {
      _id,
      status,
      timeSpent
    }: { _id: string; status: string; timeSpent: number; startDate?: string },
    callback?: () => void
  ) => void;
  beforePopupClose: () => void;
  sendToBoard?: (item: any) => void;
};

type StringState = {
  currentTab: string;
};

type State = {} & StringState;

const divStyle = {
  background: '#F9F9F9',
  padding: '20px',
  margin: '20px'
};

export default class TaskEditForm extends React.Component<Props, State> {
  constructor(props) {
    super(props);

    const item = props.item;
    console.log(item);
    this.state = {
      currentTab: 'deal'
    };
  }

  onChange = (name: string, value: string) => {
    this.setState({ [name]: value } as Pick<StringState, keyof StringState>);
  };

  renderItems = () => {
    const { item, updateTimeTrack } = this.props;

    const timeTrack = item.timeTrack || {
      timeSpent: 0,
      status: STATUS_TYPES.STOPPED
    };

    return (
      <>
        <TaskTimer
          taskId={item._id}
          status={timeTrack.status}
          timeSpent={timeTrack.timeSpent}
          startDate={timeTrack.startDate}
          update={updateTimeTrack}
        />
        <PortableDeals mainType="task" mainTypeId={this.props.item._id} />
        {/*<PortableTickets mainType="task" mainTypeId={this.props.item._id} />*/}
      </>
    );
  };

  renderFormContent = ({
    state,
    copy,
    remove,
    saveItem,
    onChangeStage
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
          stageId={state.stageId}
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
              {__('Details')}
            </TabTitle>

            <TabTitle
              className={currentTab === 'response' ? 'active' : ''}
              onClick={tabOnClick.bind(this, 'response')}
            >
              {__('Response')}
            </TabTitle>
          </Tabs>
        </HeaderRowSmall>

        {currentTab === 'response' && (
          <div style={divStyle}>
            <Form
              schema={cpvPostSchema}
              // uiSchema={uiSchema}
              //
              // formData={this.companyFormData()}
            >
              <button type="submit" style={{ display: 'none' }} />
            </Form>
          </div>
        )}

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
              saveItem={saveItem}
              renderItems={this.renderItems}
            />
          </FlexContent>
        )}
      </>
    );
  };

  render() {
    const extendedProps = {
      ...this.props,
      formContent: this.renderFormContent,
      extraFields: this.state
    };

    return <EditForm {...extendedProps} />;
  }
}
