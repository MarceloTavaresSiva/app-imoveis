// api
import api from "../utils/api";

import {useState, useEffect} from 'react'
import useFlashMessage from './useFlashMessage'
import {useNavigate} from 'react-router-dom'
import { jwtDecode } from "jwt-decode"



export default function useAuth() {

    const [authenticated, setAuthenticated] = useState(false)
    const [userInfo, setUserInfo] = useState([null]);
    const {setFlashMessage} = useFlashMessage()
    const navigate = useNavigate()

    useEffect(() => {
        const token = localStorage.getItem('token')
        if(token) {
            api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`
            setAuthenticated(true)
            
            const decoded = jwtDecode(token);
            const {name, roles} = decoded;
            setUserInfo({name, roles});
        }
    }, [])

    async function register(user) {
        let msgText = 'Cadastro realizado com sucesso!'
        let msgType = 'success'
        
        try {
            const data = await api.post('/users/register', user).then((response) => {
                return response.data
            })

        await authUser(data)

        } catch(error) {
            msgText = error.response.data.message
            msgType = 'error'
        }
        setFlashMessage(msgText, msgType)
    }

    async function login(user) {
        let msgText = 'Login realizado com sucesso'
        let msgType = 'success'

        try {

            const data = await api.post('/users/login', user).then((response) => {
                return response.data
            })
            
            await authUser(data)  
              
        }catch(error) {
            msgText = error.response.data.message
            msgType = 'error'
        }

        setFlashMessage(msgText, msgType)
    }

    async function authUser(data) {
        setAuthenticated(true)

        localStorage.setItem('token', JSON.stringify(data.token))
        navigate('/')
    }

    //async function getUserRole() {
        //try {
           // const response = await api.get('/users/roles'); 
          //  console.log(reponse);
              //headers: {
                //Authorization: `Bearer ${token}`,
             // },
            // setUserRoles(response.data.roles);
           // setUserRoles(response);
         // } catch (error) {
           // console.error('Error fetching user roles testes:', error);
         // }
    //};

    function logout() {
        const msgText = 'Logout realizado com sucesso!'
        const msgType = 'success!'

        setAuthenticated(false);
        
        ([]);

        localStorage.removeItem('token');
        api.defaults.headers.Authorization = undefined;
        navigate('/');
        setFlashMessage(msgText, msgType)
    }

    return {authenticated,register, logout, userInfo, login}
}

