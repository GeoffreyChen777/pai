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

import {DockerInfo} from './dockerInfo';
import {Completion} from './completion';
import {Deployment} from './deployment';
import {ContainerSize} from '../models/containerSize';

export class JobTaskRole {
  constructor(props) {
    const {name, instances, taskRetryCount, dockerInfo, ports, commands, completion, deployment, containerSize,
           isContainerSizeEnabled} = props;
    this.name = name;
    this.instances = instances || 1;
    this.taskRetryCount = taskRetryCount || 0;
    this.dockerInfo = dockerInfo || new DockerInfo({});
    this.ports = ports || [];
    this.commands = commands;
    this.completion = completion || new Completion({});
    this.deployment = deployment|| new Deployment({});
    this.containerSize = containerSize || new ContainerSize({});
    this.isContainerSizeEnabled = isContainerSizeEnabled || false;
  }

  getDockerPrerequisite() {
    return this.dockerInfo.convertToProtocolFormat();
  }

  getDeployment() {
    const deployment = {};
    deployment[this.name] = this.deployment.convertToProtocolFormat();
    return deployment;
  }

  setDockerImage(dockerImage) {
    this.dockerImage = dockerImage;
  }

  convertToProtocolFormat() {
    const taskRole = {};
    const ports = this.ports.map((port) => port.convertToProtocolFormat());

    taskRole[this.name] = {
      instances: this.instances,
      completion: this.completion,
      taskRetryCount: this.taskRetryCount,
      dockerImage: this.dockerImage,
      resourcePerInstance: {...this.containerSize.getResourcePerInstance(), ports: ports},
      commands: this.commands,
    };
    return taskRole;
  }
}
