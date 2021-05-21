import Button from 'modules/common/components/Button';
import {
  ControlLabel,
  FormControl,
  FormGroup
} from 'modules/common/components/form';
import DateControl from 'modules/common/components/form/DateControl';
import { Formgroup } from 'modules/common/components/form/styles';
import { __ } from 'modules/common/utils';
import { IField, IFieldLogic } from 'modules/settings/properties/types';
import SelectTags from 'modules/tags/containers/SelectTags';
import { ITag } from 'modules/tags/types';
import React from 'react';
import {
  dateTypeChoices,
  numberTypeChoices,
  stringTypeChoices
} from '../constants';
import { DateWrapper, LogicItem, LogicRow, RowFill, RowSmall } from '../styles';
import BoardSelect from 'modules/boards/containers/BoardSelect';

type Props = {
  onChangeLogic: (
    name: string,
    value: string | number | Date,
    index: number
  ) => void;
  logic: IFieldLogic;
  fields: IField[];
  index: number;
  removeLogic: (index: number) => void;
  tags: ITag[];
  currentField: IField;
  type?: string;
};

const showOptions = [
  { value: 'show', label: 'Show this field' },
  { value: 'hide', label: 'Hide this field' },
  { value: 'tag', label: 'Add a tag' },
  { value: 'deal', label: 'Create a Sales Pipeline' },
  { value: 'task', label: 'Create a task' },
  { value: 'ticket', label: 'Create a ticket' }
];

function FieldLogic(props: Props) {
  const { fields, logic, onChangeLogic, removeLogic, index } = props;

  const getSelectedField = () => {
    return fields.find(
      field => field._id === logic.fieldId || field._id === logic.tempFieldId
    );
  };

  const getOperatorOptions = () => {
    const selectedField = getSelectedField();

    if (selectedField && selectedField.validation) {
      if (selectedField.validation === 'number') {
        return numberTypeChoices;
      }

      if (selectedField.validation.includes('date')) {
        return dateTypeChoices;
      }
    }

    return stringTypeChoices;
  };

  const onChangeFieldId = e => {
    const value = e.target.value;
    onChangeLogic('fieldId', '', index);

    if (value === props.currentField._id) {
      onChangeLogic('fieldId', 'self', index);
    }

    onChangeLogic(
      value.startsWith('tempId') ? 'tempFieldId' : 'fieldId',
      value,
      index
    );

    const operators = getOperatorOptions();
    onChangeLogic('logicOperator', operators[1].value, index);
  };

  const onChangeLogicOperator = e => {
    onChangeLogic('logicOperator', e.target.value, index);
  };

  const onChangeLogicValue = e => {
    onChangeLogic('logicValue', e.target.value, index);
  };

  const onDateChange = value => {
    onChangeLogic('logicValue', value, index);
  };

  const remove = () => {
    removeLogic(index);
  };

  const onChangeLogicAction = e => {
    onChangeLogic('logicAction', e.currentTarget.value, index);
  };

  const onChangeTags = values => {
    onChangeLogic('tagIds', values, index);
  };

  const renderLogicValue = () => {
    const selectedField = getSelectedField();

    if (selectedField) {
      if (
        selectedField.type === 'check' ||
        selectedField.type === 'select' ||
        selectedField.type === 'radio'
      ) {
        return (
          <FormControl
            componentClass="select"
            defaultValue={logic.logicValue}
            name="logicValue"
            onChange={onChangeLogicValue}
          >
            <option value="" />
            {selectedField.options &&
              selectedField.options.map(option => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
          </FormControl>
        );
      }

      if (['date', 'datetime'].includes(selectedField.validation || '')) {
        return (
          <DateWrapper>
            <DateControl
              placeholder={__('pick a date')}
              value={logic.logicValue}
              timeFormat={
                selectedField.validation === 'datetime' ? true : false
              }
              onChange={onDateChange}
            />
          </DateWrapper>
        );
      }

      if (selectedField.validation === 'number') {
        return (
          <FormControl
            defaultValue={logic.logicValue}
            name="logicValue"
            onChange={onChangeLogicValue}
            type={'number'}
          />
        );
      }

      return (
        <FormControl
          defaultValue={logic.logicValue}
          name="logicValue"
          onChange={onChangeLogicValue}
        />
      );
    }

    return null;
  };

  const renderTags = () => {
    if (logic.logicAction !== 'tag') {
      return null;
    }

    return (
      <FormGroup>
        <SelectTags
          type={'customer'}
          description="tag lead"
          onChange={onChangeTags}
          defaultValue={logic.tagIds || []}
        />
      </FormGroup>
    );
  };

  // const [stageId, stgIdOnChange] = useState(logic.stageId || '');

  const onChangeStage = value => {
    console.log('asd: ', logic.stageId);
    onChangeLogic('stageId', value, index);
  };

  const onChangePipeline = value => {
    onChangeLogic('pipelineId', value, index);
  };

  const onChangeBoard = value => {
    onChangeLogic('boardId', value, index);
  };

  const renderBoardItemSelect = () => {
    if (!['task', 'deal', 'ticket'].includes(logic.logicAction)) {
      return null;
    }

    return (
      <FormGroup>
        <BoardSelect
          type={logic.logicAction || 'task'}
          stageId={logic.stageId}
          pipelineId={logic.pipelineId || ''}
          boardId={logic.boardId || ''}
          onChangeStage={onChangeStage}
          onChangePipeline={onChangePipeline}
          onChangeBoard={onChangeBoard}
        />
      </FormGroup>
    );
  };

  const renderFields = () => {
    let options = fields;
    if (!['show', 'hide'].includes(logic.logicAction)) {
      const { currentField } = props;
      if (!currentField.text) {
        currentField.text = 'Current field';
      }

      if (0 > options.findIndex(e => e._id === currentField._id)) {
        options.unshift(currentField);
      }
    }

    options = Array.from(new Set(options));
    return (
      <FormGroup>
        <ControlLabel>Fields</ControlLabel>
        <FormControl
          componentClass="select"
          value={logic.fieldId || logic.tempFieldId}
          name="fieldId"
          onChange={onChangeFieldId}
        >
          <option value="" />

          {options.map(field => (
            <option key={field._id} value={field._id}>
              {field.text}
            </option>
          ))}
        </FormControl>
      </FormGroup>
    );
  };

  return (
    <LogicItem>
      <LogicRow>
        <RowFill>
          <FormGroup>
            <ControlLabel>Actions</ControlLabel>
            <FormControl
              componentClass="select"
              defaultValue={logic.logicAction}
              name="logicAction"
              options={showOptions}
              onChange={onChangeLogicAction}
            />
          </FormGroup>

          {renderFields()}
          {renderTags()}
          {renderBoardItemSelect()}
          <LogicRow>
            <RowSmall>
              <ControlLabel>Operator</ControlLabel>
              <FormControl
                componentClass="select"
                defaultValue={logic.logicOperator}
                name="logicOperator"
                options={getOperatorOptions()}
                onChange={onChangeLogicOperator}
              />
            </RowSmall>
            <Formgroup>
              <ControlLabel>Value</ControlLabel>
              <RowFill>{renderLogicValue()}</RowFill>
            </Formgroup>
          </LogicRow>
        </RowFill>
        <Button onClick={remove} btnStyle="danger" icon="times" />
      </LogicRow>
    </LogicItem>
  );
}

export default FieldLogic;
