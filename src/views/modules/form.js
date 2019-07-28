import React from 'react'

import DefaultPage from '../../components/template/DefaultPage';
import { toJS } from 'mobx'
import { inject, observer } from 'mobx-react';
import FormGroup from '../../components/common/formGroup';
import Row from '../../components/common/row';

function ModuleForm({ modules }) {
    
    const { module } = modules

    console.log('render module form ')
    console.log(toJS(module))

    const submitIcon = `fa fa-${module && module.id ? 'refresh' : 'save'}`
    const submitLabel = `${module && module.id ? 'Update' : 'Save'}`

    const onSubmit = (e) => {
        e.preventDefault();
        if(module.id){
            modules.update(module)
        }else{
            modules.save(module)
        }
    }

    return(
        <DefaultPage title="Modules" header={module.id ? `Updating ${module.id}` : "New"}>
            <form onSubmit={onSubmit}>
                <Row>
                    <FormGroup id="name" colsSize={6} label="Name: *">
                        <input type="text" 
                               name="name" 
                               className="form-control" 
                               value={module.name} 
                               onChange={e => modules.setName(e.target.value)} />
                    </FormGroup>
                    <FormGroup id="label" colsSize={6} label="Label: *">
                        <input type="text" 
                               name="label" 
                               className="form-control" 
                               value={module.label} 
                               onChange={e => modules.setLabel(e.target.value)} />
                    </FormGroup>
                </Row>
                <Row>
                    <div className="col col-md-12">
                        <button className="btn btn-default" type="submit">
                            <i className={submitIcon}></i> {submitLabel}
                        </button>
                    </div>
                </Row>
            </form>
        </DefaultPage>
    )
}

export default inject("modules")( observer(ModuleForm) )