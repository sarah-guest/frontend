// IMPORTS COMPOSANTS
import { View, StyleSheet, ScrollView } from 'react-native';
import OurButton from '../components/Button';
import Title from '../components/Title';
import OurTag from '../components/Tag';
// IMPORTS REDUCER
import { useDispatch, useSelector } from 'react-redux';
import {
  getPrefRestauCuisine,
  getPrefRestauAtmos,
  getPrefRestauBook,
  getPrefRestauMisce,
} from '../reducers/restaurant';
// IMPORTS AUTRES
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import convertColor from '../modules/convertColor';
import IP_ADDRESS from '../modules/ipAddress';

export default function PreferencesScreen({ navigation }) {
  const dispatch = useDispatch();
  const restaurant = useSelector((state) => state.restaurant.value);

  // Fonctions qui récupèrent les infos des inputs et les mettent dans le store
  const checkPrefCuisine = (newCuisine) => {
    dispatch(getPrefRestauCuisine(newCuisine), console.log(newCuisine));
  };
  const checkPrefAtmos = (newAtmos) => {
    dispatch(getPrefRestauAtmos(newAtmos), console.log(newAtmos));
  };
  const checkPrefBook = (newBook) => {
    dispatch(getPrefRestauBook(newBook), console.log(newBook));
  };
  const checkPreMesce = (newMesce) => {
    dispatch(getPrefRestauMisce(newMesce), console.log(newMesce));
  };

  // Envoyer toutes les informations du restaurant dans la base de données
  const sendInfoRestaurant = () => {
    const {
      username,
      name,
      email,
      password,
      streetName,
      streetNumber,
      streetType,
      postCode,
      city,
      siren,
      website,
      phone,
      cuisine,
      atmosphere,
      bookings,
      miscellaneous,
    } = restaurant;

    fetch(
      `https://api-adresse.data.gouv.fr/search/?q=${streetNumber}+${streetType}+${streetName}+${postCode}`
    )
      .then((response) => response.json())
      .then((json) => {
        fetch(`http://${IP_ADDRESS}:3000/restaurants/signup`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            username,
            name,
            email,
            password,
            address: {
              streetName,
              streetNumber,
              streetType,
              postCode,
              city,
            },
            coordinates: {
              latitude: json.features[0].geometry.coordinates[1],
              longitude: json.features[0].geometry.coordinates[0],
            },
            siren,
            website,
            phone,
            cuisine,
            atmosphere,
            bookings,
            miscellaneous,
            bioShort: '',
            bioLong: '',
            socials: {},
            goals: [],
            qrcode: {},
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.result) {
              console.log(data.result);
            }
          });
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.list}></View>
      <ScrollView>
        <View style={styles.optGroup}>
          <Title style={styles.titre} h5>
            Votre cuisine est plutôt...
          </Title>
          <View style={styles.buttons}>
            <OurTag
              style={styles.button}
              text="Gourmet"
              onPress={() => checkPrefCuisine('Gourmet')}
            />
            <OurTag
              style={styles.button}
              text="Franchouillarde"
              onPress={() => checkPrefCuisine('Frachouillarde')}
            />
            <OurTag
              style={styles.button}
              text="Bistronome"
              onPress={() => checkPrefCuisine('Bistronomie')}
            />
            <OurTag
              style={styles.button}
              text="Café cosy"
              onPress={() => checkPrefCuisine('Café cosy')}
            />
            <OurTag
              style={styles.button}
              text="Petite Bourse"
              onPress={() => checkPrefCuisine('Petite Bourse')}
            />
          </View>
        </View>
        <View style={styles.optGroup}>
          <Title style={styles.titre} h5>
            L'atmosphère du lieu
          </Title>
          <View style={styles.buttons}>
            <OurTag
              style={styles.button}
              text="Groupe d'amis"
              onPress={() => checkPrefAtmos("Groupe d'amis")}
            />
            <OurTag
              style={styles.button}
              text="Famille"
              onPress={() => checkPrefAtmos('Famille')}
            />
            <OurTag
              style={styles.button}
              text="Tête à tête"
              onPress={() => checkPrefAtmos('Tête à tête')}
            />
          </View>
        </View>
        <View style={styles.optGroup}>
          <Title styles={styles.titre} h5>
            Les réservations
          </Title>
          <View style={styles.buttons}>
            <OurTag text="Oui" onPress={() => checkPrefBook('Oui')} />
            <OurTag text="Non" onPress={() => checkPrefBook('Non')} />
          </View>
          <Title style={styles.titre} h5>
            Autres
          </Title>
          <View style={styles.buttons}>
            <OurTag
              text="Accueil PMR"
              onPress={() => checkPreMesce('Accueil PMR')}
            />
            <OurTag
              text="Animaux acceptés"
              onPress={() => checkPreMesce('Animaux acceptés')}
            />
          </View>
        </View>
        <View style={styles.optGroup}>
          <Title style={styles.titre} h5>
            Réseaux Sociaux
          </Title>
          <View style={styles.logo}>
            <FontAwesomeIcon
              name={'twitter'}
              size={32}
              color={convertColor('caféaulaitchaud')}
            />
            <FontAwesomeIcon
              name={'facebook'}
              size={32}
              color={convertColor('caféaulaitchaud')}
            />
            <FontAwesomeIcon
              name={'instagram'}
              size={32}
              color={convertColor('caféaulaitchaud')}
            />
          </View>
        </View>
        <OurButton text="Suivant" onPress={sendInfoRestaurant} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 32,
    flex: 1,
    marginTop: 25,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  list: {
    marginTop: 40,
  },
  titre: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  logo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 160,
    color: convertColor('caféaulaitchaud'),
  },
  buttons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  button: {
    marginright: 10,
  },
  optGroup: {
    marginBottom: 16,
  },
});
