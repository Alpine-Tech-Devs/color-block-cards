import React from "react";
import { FlatList, Image, ImageSourcePropType, Pressable, StyleSheet, Text, View } from "react-native";

interface Props {
    id: number
    image: ImageSourcePropType
    title: string
    width: number
}

const cardData: Props[] = [
    {id: 1, title: 'Lowbush Blueberry', image: require('../assets/card-screenshots/Lowbush-Blueberry.png'),  width: 150},
    {id: 2, title: 'Little Henry Virginia Sweetspire', image: require('../assets/card-screenshots/Little-Henry.png'), width: 350}
]

const BlockCard: React.FC<Props> = ({title, image, width}) => {
   return(
    <Pressable>
        <View style={[styles.cardContainer, { width }]}>
            <Image source={image} style={styles.image} resizeMode="cover" />
            <Text style={styles.title}>{title}</Text>
        </View>
    </Pressable>
   )
}

const BlockCards: React.FC= () => {
    return(
        <FlatList
        data={cardData}
        horizontal
        keyExtractor={(item) => item.id.toString()}
        renderItem={({item}) => <BlockCard {...item} />}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        />
    )
}

const styles = StyleSheet.create({
     listContent: {
    paddingHorizontal: 16,
    paddingVertical: 24,
    },
    cardContainer: {
    backgroundColor: '#e2f0ff',
    marginHorizontal: 8,
    borderRadius: 12,
    overflow: 'hidden',
    alignItems: 'center',
  },
    image: {
    width: '100%',
    height: 100,
  },
  title: {
    padding: 10,
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
})

export default BlockCards;