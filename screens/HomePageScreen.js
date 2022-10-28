import { useState, useEffect } from 'react';
import {
    ImageBackground,
    SafeAreaView,
    ScrollView,
    StyleSheet
} from 'react-native';
//imports de nos composants
import SearchBar from '../components/SearchBar';
import Meal from '../components/Meal';
import Title from '../components/Title';

export default function HomePageScreen({ navigation }) {
    const IP_ADDRESS = '192.168.10.136';
    //const IP_ADDRESS = '172.20.10.11';

    const [mealsData, setMealsData] = useState([]);

    //on récupère les plats du jour
    useEffect(() => {
        fetch(`http://${IP_ADDRESS}:3000/users/getplatsdujour`)
            .then(res => res.json())
            .then(data => {
                //on set dans mealsData les données récoltées
                data !== null && setMealsData(data.platsdujour)
            })
    }, []);

    const meals = mealsData.map((data, i) => (<Meal key={i} {...data} />));

    return (

        <ImageBackground
            source={require('../assets/images/background.jpg')}
            style={styles.background}
            blurRadius={60}
        >
            <SafeAreaView style={styles.container}>
                <SearchBar />
                <ScrollView>
                    {/* Populaires */}
                    <Title h2 isLight={true}>Populaires</Title>
                    <ScrollView
                        style={styles.scroll}
                        horizontal={true}
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                    >
                        {meals}
                    </ScrollView>

                    {/* Derniers consultés */}
                    <Title h4 isLight={true}>Vus récemment 👀</Title>

                    {/* Coups de coeur de l'équipe */}

                </ScrollView>
            </SafeAreaView>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        marginTop: 50,
        marginBottom: 50,
        marginLeft: 30,
        marginRight: 30,
    },
    scroll: {
        marginTop: 10,
        marginBottom: 30,
    },
});
