import * as React from 'react'
import { shallow, ShallowWrapper, render } from 'enzyme'

import TitleWithEditor from './index'

describe('Component Init', () => {
    it('should load success', () => {
        const renderer: ShallowWrapper = shallow(<TitleWithEditor value="Foo" onChange={() => {}} />)
        expect(renderer.text()).toEqual('Foo')
        expect(renderer.find('div.change i').prop('className')).toBe('fa fa-pencil-square-o')
    })

    it('should switch to edit mode', () => {
        const renderer: ShallowWrapper = shallow(<TitleWithEditor value="Foo" onChange={() => {}} />)
        const inst: any = renderer.instance()
        inst.onEditClick()
        expect(renderer.exists('div.show')).toBeFalsy()
        expect(renderer.exists('div.edit')).toBeTruthy()
        expect(renderer.exists('Input')).toBe(true)
    })

    it('should trigger onChange event', () => {
        const changeHandler = e => {
            expect(e).toBe('newFoo')
        }
        const renderer: ShallowWrapper = shallow(<TitleWithEditor value="Foo" onChange={changeHandler} />)
        const inst: any = renderer.instance()
        inst.triggerChange({ target: { value: 'newFoo' } })
        expect(renderer.exists('div.show')).toBeTruthy()
    })

    it('should not trigger onChange event when new value equals old value', () => {
        const changeHandler = e => {
            expect(true).toBe(false)
        }
        const renderer: ShallowWrapper = shallow(<TitleWithEditor value="Foo" onChange={changeHandler} />)
        const inst: any = renderer.instance()
        inst.triggerChange({ target: { value: 'Foo' } })
        expect(renderer.exists('div.show')).toBeTruthy()
    })

    it('should not trigger onChange event when new value is empty', () => {
        const changeHandler = e => {
            expect(true).toBe(false)
        }
        const renderer: ShallowWrapper = shallow(<TitleWithEditor value="Foo" onChange={changeHandler} />)
        const inst: any = renderer.instance()
        inst.triggerChange({ target: { value: '' } })
        expect(renderer.exists('div.show')).toBeTruthy()
    })

    it('should be no error when no pass onChange event handler', () => {
        const renderer: ShallowWrapper = shallow(<TitleWithEditor value="Foo" />)
        const inst: any = renderer.instance()
        inst.triggerChange({ target: { value: 'newFoo' } })
        expect(true).toBe(true)
    })

    it('should use customize icon', () => {
        const renderer: ShallowWrapper = shallow(
            <TitleWithEditor value="Foo" onChange={() => {}} iconClassName="fa fa-pencil" />
        )
        expect(renderer.find('div.change i').prop('className')).toBe('fa fa-pencil')
    })

    // TODO: 需要找到修改component inputRef属性的方法
    xit('should select input content', () => {
        const renderer: ShallowWrapper = shallow(<TitleWithEditor value="Foo" onChange={() => {}} />)
        const inst: any = renderer.instance()
        inst.onEditClick()
        // mock the inputRef
        inst.inputRef.current = {
            select: jest.fn(() => {})
        }
        jest.runAllTimers()
    })
})
