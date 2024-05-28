import React from 'react';
import { View, FlatList, Text } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';

// TODO: Modtag data object fra DataHandler
// TODO: Render hvert data punkt i individuelle text elementer
// TODO: inputfelter til count og effort




interface DataType {
  id: number;
  name: string;
  // Add other fields as necessary
}

type RouteParams = {
  data: DataType[];
};

const RenderDataScreen: React.FC = () => {
  const route = useRoute<RouteProp<{ params: RouteParams }, 'params'>>();
  const { data } = route.params;

  return (
    <Text>Yeet</Text>
  );
};

export default RenderDataScreen;
