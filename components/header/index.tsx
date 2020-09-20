import Link from 'next/link'
import { useContext } from 'react';
import StoreContext from '../../context/store';


export default function Header(){
    const store = useContext(StoreContext);
    console.log('This state call from header')
    return(
        <header>
            <p>this is header</p>
            <ul>
                <Link href="/"><li>Homepage</li></Link>
                <Link href="/about"><li>About</li></Link>
                <Link href="/contact"><li>Contact</li></Link>
                <Link href="/blogs"><li>Blog</li></Link>
                <Link href="/works"><li>Works</li></Link>
            </ul>
        </header>
    )
}