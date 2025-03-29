import PropTypes from 'props-types'

ListCard.propTypes = {
    id: PropTypes.string,
    done: PropTypes.bool,
    taskTitle: PropTypes.string,
    taskDateTime: PropTypes.string,
    onClickItem: PropTypes.func
}

const ListCard = (props) => {  
    const {id, done, taskTitle, onClickItem} = props;
    
    let className = 'list-item';
    if (done) {
        className += '-done';
    }

    const atClick = () => {
        onClickItem(id);
    };

    return <li className={className} onClick={atClick}>{`${taskTitle}`}</li>
}

export default ListCard