
import { useEffect, useRef, useState } from "react"
import { plantService } from "../services/plant.service.local.js"
import { utilService } from "../services/util.service.js"
import { MultiSelect } from "react-multi-select-component"
import { logDOM } from "@testing-library/react"

export function PlantFilter({ onSetFilter }) {

    const [filterByToEdit, setFilterByToEdit] = useState(plantService.getDefaultFilter())
    const [selected, setSelected] = useState([]);

    onSetFilter = useRef(utilService.debounce(onSetFilter))

    const elInputRef = useRef(null)

    useEffect(() => {
        handleLableChange()
    }, [selected])

    useEffect(() => {
        // update father cmp that filters change very type
        onSetFilter.current(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        let { value, name: field, type } = target
        value = (type === 'number' || type === 'range') ? +value : value
        setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
    }

    function handleLableChange() {
        const lables = selected.map(lable => {
            return lable.value
        })
        setFilterByToEdit((prevFilter) => ({ ...prevFilter, lables: lables }))
    }

    function onSubmitFilter(ev) {
        // update father cmp that filters change on submit
        ev.preventDefault()
        onSetFilter(filterByToEdit)
    }

    const options = [
        { label: "On wheels", value: "On wheels" },
        { label: "Box game", value: "Box game" },
        { label: "Art", value: "Art", },
        { label: "Baby", value: "Baby", },
        { label: "Doll", value: "Doll", },
        { label: "Puzzle", value: "Puzzle", },
        { label: "Outdoor", value: "Outdoor", },
        { label: "Battery Powered", value: "Battery Powered", },
    ];




    return <section className="plant-filter">
        <form onSubmit={onSubmitFilter}>
            <h2>Plants Filter</h2>
            <div className="filter-category">
                <label htmlFor="name">Name:</label>
                <input type="text"
                    id="name"
                    name="name"
                    placeholder="By name"
                    value={filterByToEdit.name}
                    onChange={handleChange}
                    ref={elInputRef}
                />
            </div>
            <hr />
            <div className="filter-category">

                <label htmlFor="price">Price:</label>
                <span>${filterByToEdit.price}</span>
                <input type="range"
                    min={0}
                    max={1200}
                    id="price"
                    name="price"
                    placeholder="By max price"
                    value={filterByToEdit.price}
                    onChange={handleChange}
                />
            </div>
            <hr />
            <label htmlFor="inStock">In stock</label>
            <select
                className="inStock"
                name='inStock'
                value={filterByToEdit.inStock}
                onChange={handleChange}
            >
                <option value=''>All</option>
                <option value={true}>In stock</option>
                <option value={false}>Out of stock</option>
            </select>
            <hr />

            <div className="">
                <label htmlFor="MultiSelect"> Select category</label>
                <MultiSelect
                    options={options}
                    value={selected}
                    onChange={setSelected}
                    labelledBy="Select"
                />
            </div>
            <hr />
        </form>

    </section>
}