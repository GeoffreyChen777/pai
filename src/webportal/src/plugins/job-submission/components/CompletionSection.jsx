/*
 * Copyright (c) Microsoft Corporation
 * All rights reserved.
 *
 * MIT License
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED *AS IS*, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import React, {useState} from 'react';
import {Stack} from 'office-ui-fabric-react';
import PropTypes from 'prop-types';
import {BasicSection} from './BasicSection';
import {Completion} from '../models/completion';
import {CSpinButton} from './CustomizedComponents';
import {getCompletionSectionStyle} from './formStyle';
import {FormShortSection} from './FormPage';

const completionSectionStyle = getCompletionSectionStyle();

export const CompletionSection= (props) => {
  const {onChange, defaultValue} = props;
  const [value, setValue] = useState(defaultValue);
  const {minFailedInstances, minSuceedInstances} = value;

  const _onChange = (keyName, newValue) => {
    const completion = new Completion(value);
    completion[keyName] = newValue;
    if (onChange !== undefined) {
      onChange(completion);
    }
    setValue(completion);
  };

  return (
    <BasicSection sectionLabel={'Completion'} sectionOptional>
      <FormShortSection gap='m'>
        <Stack horizontal gap='s1'>
          <CSpinButton label={'Min Failed Instances'}
                       value={minFailedInstances}
                       styles={completionSectionStyle.spinButton}
                       onChange={(v) => _onChange('minFailedInstances', v)}/>
        </Stack>
        <Stack horizontal gap='s1'>
          <CSpinButton label={'Min Succeed Instances'}
                       value={minSuceedInstances}
                       styles={completionSectionStyle.spinButton}
                       onChange={(v) => _onChange('minSuceedInstances', v)}/>
        </Stack>
      </FormShortSection>
    </BasicSection>
  );
};

CompletionSection.propTypes = {
  defaultValue: PropTypes.instanceOf(Completion).isRequired,
  onChange: PropTypes.func,
};