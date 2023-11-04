
import { Link, useNavigate } from 'react-router-dom'

// eslint-disable-next-line react/prop-types
const LinkButton = ({children, to}) => {
    const styles = 'text-sm text-blue-500 hover:text-blue-600';
    const navigate = useNavigate();
    if(to === '-1'){
        return <button className={styles} onClick={() => navigate(-1)}>{children}</button>
    }
  return (
    <Link to={to} className={styles}>
        {children}
    </Link>
  )
}

export default LinkButton