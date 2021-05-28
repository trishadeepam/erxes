import client from 'apolloClient';
import gql from 'graphql-tag';
import { queries } from 'modules/boards/graphql';
import { queries as fieldQueries } from 'modules/settings/properties/graphql';
import { IField } from 'modules/segments/types';
import React from 'react';
import BoardItemSelect from '../components/BoardItemSelect';

type IProps = {
  boardId?: string;
  pipelineId?: string;
  stageId?: string;
  relType?: string;
  type: string;
  onChangeCard: (name?: string, cardId?: string) => void;
};

class BoardItemSelectContainer extends React.Component<IProps> {
  fetchCards = (stageId: string, callback: (cards: any) => void) => {
    const { type } = this.props;

    client
      .query({
        query: gql(queries[`${type}s`]),
        fetchPolicy: 'network-only',
        variables: { stageId, limit: 0 }
      })
      .then(({ data }: any) => {
        callback(data[`${type}s`]);
      });
  };

  fetchProperties = (
    boardId: string,
    pipelineId: string,
    callback: (properites: IField[]) => void
  ) => {
    client
      .query({
        query: gql(fieldQueries.fields),
        fetchPolicy: 'network-only',
        variables: { boardId, pipelineId }
      })
      .then(({ data }: any) => {
        console.log(data);
        // callback(data[`${type}s`]);
      });
  };

  render() {
    const extendedProps = {
      ...this.props,
      fetchCards: this.fetchCards,
      fetchProperties: this.fetchProperties
    };

    return <BoardItemSelect {...extendedProps} />;
  }
}

export default BoardItemSelectContainer;
