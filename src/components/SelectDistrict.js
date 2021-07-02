import React, {useState} from 'react'
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputLabel from '@material-ui/core/InputLabel';
import ButtonPub from './ButtonPub'
import ButtonTour from './ButtonTour';


const SelectDistrict = () => {
    const [selectedDistrict, setDistrict] = useState(1)

    /** Handle the select menu change and set the value */
    const handleChange = (event) => {
        const district = event.target.value;
        setDistrict(district)
    };

    return (
        <div>
            <div className="select-menu">
            <FormControl >
                <InputLabel htmlFor="district-native-simple">Valitse alueesi</InputLabel>
                <NativeSelect
                value={selectedDistrict}
                onChange={handleChange}
                inputProps={{
                    name: 'district',
                    id: 'district-native-simple',
                }}
                >
                <option value={1}>Hämeenkatu</option>
                <option value={2}>Tammela & Kaleva</option>
                <option value={3}>Hervanta</option>
                </NativeSelect>
            </FormControl>
            </div>
            <div className="buttons">
                <ButtonPub districtValue={selectedDistrict}></ButtonPub>
                <ButtonTour districtValue={selectedDistrict}></ButtonTour>
            </div>
        </div>
    )
}
export default SelectDistrict