import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import Select from 'react-select'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'

import { plantService } from '../services/plant.service.local.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { savePlant } from '../store/plant.action.js'

export function PlantEdit() {
    ////////////////////////////////////////////////////////////////////////////////////

    const [plantToEdit, setPlantToEdit] = useState(plantService.getEmptyPlant())
    const [selectedOptions, setSelectedOptions] = useState()

    const navigate = useNavigate()
    const { plantId } = useParams()

    useEffect(() => {
        if (!plantId) return
        loadPlant()
    }, [])

    async function loadPlant() {
        try {
            const plant = await plantService.get(plantId)
            setPlantToEdit(plant)
        } catch (err) {
            console.log('Had issues in plant details', err)
            navigate('/plant')
        }
    }

    function handleChange({ target }) {
        let { value, name: field, type } = target
        value = type === 'number' ? +value : value
        setPlantToEdit((prevPlant) => {
            return { ...prevPlant, [field]: value }
        })
    }

    function handleSelect(data) {
        setSelectedOptions(data)
        const lablesToSet = data.length ? data.map((i) => i.value) : []
        setPlantToEdit((prevPlant) => ({ ...prevPlant, lables: lablesToSet }))
    }
    async function onAddPlant(values) {
        // ev.preventDefault()
        const lables = selectedOptions.map((option) => option.label)
        const plantToSave = {
            ...plantToEdit,
            ...values,
            lables,
        }
        const savedPlant = await savePlant(plantToSave)
        try {
            showSuccessMsg(`Plant added (id: ${savedPlant._id})`)
            navigate('/plant')
        } catch (err) {
            showErrorMsg('Cannot add Plant', err)
        }
    }

    const SignupSchema = Yup.object().shape({
        name: Yup.string().min(2, 'Too Short!').max(20, 'Too Long!').required('Required'),
        price: Yup.string().min(2, 'Too Short!').max(4, 'Too Long!').required('Required'),
    })

    const h1Props = {
        style: { color: 'red' },
        title: 'Hello im a Title',
    }

    return (
        <section className="plant-edit">
            {/* <h1 title="Hello im an h1" style={{color:'red'}}>Signup</h1> */}
            <h1 {...h1Props}>Add Plant</h1>
            <Formik
                initialValues={{
                    name: '',
                    price: 0,
                    lables: [],
                }}
                validationSchema={SignupSchema}
                onSubmit={onAddPlant}
            >
                {({ errors, touched }) => (
                    <Form className="name">
                        <Field name="name" id="name" placeholder="Plant Name" />
                        {errors.name && touched.name ? <span>{errors.name}</span> : null}

                        <Field name="price" id="price" placeholder="Plant Price" />
                        {errors.price && touched.price ? <div>{errors.price}</div> : null}

                        <Select
                            name="lables"
                            options={plantService.getPlantLabels().map((label) => ({ value: label, label }))}
                            value={selectedOptions}
                            onChange={handleSelect}
                            placeholder="Select lables"
                            isMulti={true}
                        />

                        <button type="submit">Save Plant</button>
                    </Form>
                )}
            </Formik>

            <Link className="nice-link" to="/plant">
                Cancel
            </Link>
        </section>
    )
}
