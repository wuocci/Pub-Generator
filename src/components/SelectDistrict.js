import React, {useState} from 'react'
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputLabel from '@material-ui/core/InputLabel';
import ButtonPub from './ButtonPub'


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
                id ="select"
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
            <div >
                <ButtonPub districtValue={selectedDistrict}/>

            </div>
        </div>
    )
}
export default SelectDistrict