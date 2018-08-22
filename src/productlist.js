import Faker from 'faker'

export default Array.apply(null, Array(25)).map((val, index) => {
    return {id: index, name: Faker.lorem.word(), price: Faker.finance.amount(0.01, 100, 2)}
})
