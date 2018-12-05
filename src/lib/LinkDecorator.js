/* @flow */
import React from 'react';
import {ENTITY_TYPE} from 'draft-js-utils';

import type {ContentBlock, ContentState} from 'draft-js';

type Props = {
  children: ReactNode,
  entityKey: string,
  contentState: ContentState,
};

type EntityRangeCallback = (start: number, end: number) => void;

function Link(props: Props) {
  //console.log(props);
  const {url,currentClass,currentTarget} = props.contentState.getEntity(props.entityKey).getData();
  //console.log({url},{currentClass},{currentTarget});
  return (
    <a href={url} className={currentClass} target={currentTarget}>{props.children}</a>
  );
}

function findLinkEntities(contentBlock: ContentBlock, callback: EntityRangeCallback, contentState: ?ContentState) {
  contentBlock.findEntityRanges((character) => {
    const entityKey = character.getEntity();
    if (entityKey != null) {
      let entity = contentState ? contentState.getEntity(entityKey) : null;
      return entity != null && entity.getType() === ENTITY_TYPE.LINK;
    }
    return false;
  }, callback);
}

export default {
  strategy: findLinkEntities,
  component: Link,
};
