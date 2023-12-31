import { useState } from 'react'
import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import { useFoodContext, useModal } from '../hooks'
import { CaloriesCounterMainLayout, CaloriesCounterSectionLayout } from '../layouts'
import { FormAddFood } from '../components/form-add-food'
import { Food } from '../components/food'
import { CustomModal } from '../components/modal'

export const AddFood = () => {
  const [query, setQuery] = useState('')
  const { isOpen, toggleModal } = useModal({ initialState: false })
  const { allFoods, handleSearch } = useFoodContext()

  return (
    <CaloriesCounterMainLayout>
      {/* ADD NEW FOOD */}
      <View style={styles.addFoodSection}>
        <Text>add food</Text>
        <CustomModal modalVisible={isOpen} onModalVisible={toggleModal}>
          <FormAddFood />
        </CustomModal>
        <Pressable
          style={[styles.button, styles.buttonOpen, { width: 35, height: 35 }]}
          onPress={toggleModal}>
          <Text style={{ color: '#fff' }}>+</Text>
        </Pressable>
      </View>
      {/* FORM SEARCH */}
      <View style={styles.searchSection}>
        <TextInput value={query} onChange={(e) => setQuery(e.nativeEvent.text)} placeholder='chiken, fish, apple' style={styles.input} />
        <Pressable
          onPress={() => handleSearch(query)}
          style={[styles.button, styles.buttonOpen, { height: 40, padding: 6 }]}
        >
          <Text style={{ color: '#fff' }}>search</Text>
        </Pressable>
      </View>

      {/* LIST OF FOODS */}
      <CaloriesCounterSectionLayout title='foods'>
        <FlatList
          data={allFoods}
          renderItem={({ item }) => <Food key={`food-${item.name}`} food={item} isAdded={false} />}
          keyExtractor={item => item.name}
        />
      </CaloriesCounterSectionLayout>
    </CaloriesCounterMainLayout>
  )
}

const styles = StyleSheet.create({
  addFoodSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  addFoodText: {
    fontWeight: '700',
    fontSize: 16,
    textTransform: 'capitalize',
  },
  button: {
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#222'
  },
  buttonClose: {},
  container: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  input: {
    width: '80%',
    height: 40,
    borderWidth: 1,
    padding: 10,
  },
  searchSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
})
