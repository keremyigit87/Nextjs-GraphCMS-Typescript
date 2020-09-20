import Link from 'next/link'

export default function Header(){
    return(
        <header>
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