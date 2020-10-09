import { mount, shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import flushPromises from 'flush-promises'
import Users from '@/components/Users'
import UsersStore from '@/store/modules/users'
import axios from 'axios'

jest.mock('axios')

const localVue = createLocalVue()
localVue.use(Vuex)

describe('Users', () => {
  let actions
  // let mutations
  // let state

  beforeEach(() => {
    actions = {
      loadUsers: jest.fn()
    }
    // mutations = {
    //   updateUsers: jest.fn()
    // }
    // state = {
    //   users: []
    // }
  })

  it('is a Vue instance', async () => {
    const store = new Vuex.Store({
      modules: {
        users: {
          namespaced: true,
          actions,
          // mutations: UsersStore.mutations,
          getters: UsersStore.getters
          // state: UsersStore.state
        }
      }
    })
    const wrapper = shallowMount(Users, {
      store,
      localVue
    })
    await flushPromises()
    expect(wrapper.isVueInstance).toBeTruthy()
    wrapper.destroy()
  })

  it('is calling the correct mutation', async () => {
    const store = new Vuex.Store({
      modules: {
        users: {
          namespaced: true,
          actions,
          getters: UsersStore.getters
        }
      }
    })
    const wrapper = shallowMount(Users, {
      // propsData: {},
      // mocks: {},
      // stubs: {},
      // methods: {},
      store,
      localVue
    })
    await flushPromises()
    expect(actions.loadUsers).toHaveBeenCalled()
    wrapper.destroy()
  })

  it('fetches successfully data from an API', async () => {
    const resp = {
      data: {
        data: {
          users: {
            users: [
              {
                id: 'foo',
                username: 'alice'
              },
              {
                id: 'bar',
                username: 'bob'
              }
            ],
            usersCount: 2
          }
        }
      }
    }

    axios.mockImplementationOnce(() => Promise.resolve(resp))

    const store = new Vuex.Store({
      modules: {
        users: UsersStore
      }
    })

    const wrapper = mount(Users, {
      // propsData: {},
      // mocks: {},
      // stubs: {},
      // methods: {},
      store,
      localVue
    })
    await flushPromises()
    expect(wrapper.findAll('li').length).toBe(2)
    wrapper.destroy()
  })
})
