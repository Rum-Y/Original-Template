import {createStore} from 'vuex'
import { SessionUtils } from '../utils'

export default createStore({
    state() {
        return {
            persistenceSchoolCode: SessionUtils.get('persistenceSchoolCode') || '',
            schoolCode: '',
            projectCode: '',
            teamIndex: ''
        }
    },
    mutations: {
        updateSchoolCode(state, newValue) {
            state.schoolCode = newValue
        },
        updateprojectCode(state, newValue) {
            state.projectCode = newValue
        },
        updateteamIndex(state, newValue) {
            state.teamIndex = newValue
        },
        updatePersistenceSchoolCode(state, newValue) {
            state.persistenceSchoolCode = newValue
            SessionUtils.set('persistenceSchoolCode', state.persistenceSchoolCode)
        }
    }
})