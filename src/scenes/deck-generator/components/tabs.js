import React from 'react';
import PropTypes from 'prop-types';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import { Card } from '@components';

const CardsTabs = props => {
  const { tabs, handleingAddedCard, selectMode } = props;
  return (
    <Tabs>
      <TabList>
        <Tab>Common</Tab>
        <Tab>Rare</Tab>
        <Tab>Epic</Tab>
        <Tab>Legendary</Tab>
      </TabList>

      {tabs.map(tab => (
        <TabPanel key={JSON.stringify(tab)}>
          {tab.map(card => {
            return (
              <Card
                key={JSON.stringify(card)}
                card={card}
                selectMode={selectMode}
                handleingAddedCard={handleingAddedCard}
              />
            );
          })}
        </TabPanel>
      ))}
    </Tabs>
  );
};

CardsTabs.propTypes = {
  tabs: PropTypes.array.isRequired,
  handleingAddedCard: PropTypes.func.isRequired,
  selectMode: PropTypes.bool.isRequired,
};

export default CardsTabs;
