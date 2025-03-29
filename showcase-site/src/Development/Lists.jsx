import PropTypes from 'props-types'

List.propTypes = {
    toDoList: PropTypes.array
}

const List = ({toDoList}) => {
    const listItems = toDoList.map(listCard => listCard);

    return (
        <div>
            <ul>{listItems}</ul>
        </div>
    )
}

export default List