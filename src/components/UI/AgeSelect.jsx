import { CustomForm } from '.'

function AgeSelect({ form = {}, handleChange = (f) => f }) {
  const fields = [
    { type: 'number', label: 'Day', value: form.day, name: 'day' },
    { type: 'number', label: 'Month', value: form.month, name: 'month' },
    { type: 'number', label: 'Year', value: form.year, name: 'year' },
  ]
  return <CustomForm fields={fields} handleChange={handleChange} />
}

export default AgeSelect
