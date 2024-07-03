import React, {useEffect, useState} from 'react'
import appwriteService from "../appwrite/config.js";
import {Container, PostCard} from '../components/index.js'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';


function Home() {
    const [posts, setPosts] = useState([])
    const userData = useSelector((state) => state.auth.userData);
    const navigate = useNavigate()

    useEffect(() => {
        appwriteService.getPosts(userData?.$id).then((posts) => {
            if (posts) {
                setPosts(posts.documents)
            }
        })
    }, [userData])

    
    if (posts.length === 0) {
        return (
            <div className="w-full py-8 mt-4 text-left flex flex-col min-h-screen">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 class="font-serif text-xl font-regular leading-[1rem] tracking-wider text-gray-800"> 
                            <button
                                onClick={() => navigate('/add-post')}
                                className='hover:text-red-800'
                                >{'Write Your'}
                            </button></h1>
                            <h1 class="font-serif text-xl font-regular leading-[1rem] tracking-wider text-gray-800"><span class="font-bold text-2xl leading-[2rem] tracking-tight text-gray-300"> Blogs & Articles </span> Now </h1>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }
        return (
            <div className='w-full py-8 mt-4 text-left flex flex-col min-h-screen'>
                <Container>
                    <div className='flex flex-wrap'>
                        {posts.map((post) => (
                            <div key={post.$id} className='p-2 w-1/4'>
                                <PostCard {...post} />
                                {/* <h1 className="text-2xl font-bold hover:text-red-500">
                                some posts are there
                            </h1> */}

                            </div>
                        ))}
                    </div>
                </Container>
            </div>
        )
}

export default Home