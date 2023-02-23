import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getCategories } from '../store/postSlice'
import'./style.css';
export default function Navigation() {
    const dispatch = useDispatch();
    const categories = useSelector(state => state.post.categories);
    useEffect(() => {
        dispatch(getCategories());
    }, [])
    return (
        <nav id='category-nav'>
            <ul>
                {categories.map(category => {
                    return (
                        <li key={category._id}>
                            <NavLink
                                to={`${category.name}/${category._id}`}
                                activeClassName='active'>
                                {category.name}
                            </NavLink>
                        </li>
                    )
                })}
            </ul>
        </nav>
    )
}