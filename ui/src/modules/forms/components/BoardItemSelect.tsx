import CardSelect from 'modules/boards/components/portable/CardSelect';
import BoardSelect from 'modules/boards/containers/BoardSelect';
import { SelectContainer } from 'modules/boards/styles/common';
import { HeaderRow, HeaderContent } from 'modules/boards/styles/item';
import ControlLabel from 'modules/common/components/form/Label';
import { IField } from 'modules/segments/types';
import React from 'react';

type Props = {
  type: string;
  boardId?: string;
  pipelineId?: string;
  stageId?: string;
  cardId?: string;
  fetchCards: (stageId: string, callback: (cards: any) => void) => void;
  fetchProperties: (
    boardId: string,
    pipelineId: string,
    callback: (cards: any) => void
  ) => void;
  onChangeCard: (name?: string, cardId?: string) => void;
};

type State = {
  stageId: string;
  name: string;
  disabled: boolean;
  boardId: string;
  pipelineId: string;
  cards: any;
  cardId: string;
};

class AddForm extends React.Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      disabled: false,
      boardId: props.boardId || '',
      pipelineId: props.pipelineId || '',
      stageId: props.stageId || '',
      cardId: props.cardId || '',
      cards: [],
      name: ''
    };
  }

  onChangeField = <T extends keyof State>(name: T, value: State[T]) => {
    if (name === 'stageId') {
      const { fetchCards, fetchProperties } = this.props;
      fetchCards(String(value), (cards: any) => {
        if (cards) {
          this.setState({
            cards: cards.map(c => ({ value: c._id, label: c.name }))
          });
        }
      });

      fetchProperties(
        this.state.boardId,
        this.state.pipelineId,
        (fields: IField[]) => {
          if (fields) {
            console.log('field: ', fields);
          }
        }
      );
    }
    this.setState(({ [name]: value } as unknown) as Pick<State, keyof State>);
  };

  renderSelect() {
    const { type } = this.props;

    const { stageId, pipelineId, boardId } = this.state;

    const stgIdOnChange = stgId => this.onChangeField('stageId', stgId);
    const plIdOnChange = plId => this.onChangeField('pipelineId', plId);
    const brIdOnChange = brId => this.onChangeField('boardId', brId);

    return (
      <BoardSelect
        type={type}
        stageId={stageId || ''}
        pipelineId={pipelineId || ''}
        boardId={boardId || ''}
        onChangeStage={stgIdOnChange}
        onChangePipeline={plIdOnChange}
        onChangeBoard={brIdOnChange}
      />
    );
  }

  onChangeCardSelect = option => {
    const { cardId, name } = option;

    if (cardId) {
      return this.props.onChangeCard('', cardId);
    }

    this.props.onChangeCard(name, '');
  };

  onChangeName = e => {
    const name = (e.target as HTMLInputElement).value;
    this.props.onChangeCard(name, '');
  };

  render() {
    const { type } = this.props;

    return (
      <>
        {this.renderSelect()}
        <SelectContainer>
          <HeaderRow>
            <HeaderContent>
              <ControlLabel required={true}>Name</ControlLabel>

              <CardSelect
                placeholder={`Add a new ${type} or select one`}
                options={this.state.cards}
                onChange={this.onChangeCardSelect}
                type={type}
                additionalValue={this.state.name}
              />
            </HeaderContent>
          </HeaderRow>
        </SelectContainer>
      </>
    );
  }
}

export default AddForm;
