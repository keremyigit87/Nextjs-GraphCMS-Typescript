import Header from '../components/header'
import Footer from '../components/footer'

function Layout({ children }) {
    return(
        <>
            <Header/>
            {children}
        <Footer/>
        </>
    )
}
export default Layout;