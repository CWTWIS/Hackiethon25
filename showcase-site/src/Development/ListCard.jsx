import PropTypes from 'props-types'

ListCard.propTypes = {
    taskTitle: PropTypes.string,
    taskDateTime: PropTypes.string,
    onClickItem: PropTypes.func
}

const ListCard = (props) => {  
    const {taskTitle, onClickItem} = props;

    const atClick = () => {
        onClickItem();
    };

    return <li onClick={atClick}>{`${taskTitle}`}</li>
}

export default ListCard