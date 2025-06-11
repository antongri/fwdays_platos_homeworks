/*
Copyright 2025.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

package v1

import (
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
)

// DemoSpec defines the desired state of Demo
type DemoSpec struct {
	// Message is a custom message to be displayed
	Message string `json:"message,omitempty"`

	// Replicas is the number of desired replicas
	Replicas int32 `json:"replicas,omitempty"`
}

// DemoStatus defines the observed state of Demo
type DemoStatus struct {
	// AvailableReplicas is the number of available replicas
	AvailableReplicas int32 `json:"availableReplicas,omitempty"`

	// LastUpdated is the last time the status was updated
	LastUpdated metav1.Time `json:"lastUpdated,omitempty"`
}

//+kubebuilder:object:root=true
//+kubebuilder:subresource:status

// Demo is the Schema for the demos API
type Demo struct {
	metav1.TypeMeta   `json:",inline"`
	metav1.ObjectMeta `json:"metadata,omitempty"`

	Spec   DemoSpec   `json:"spec,omitempty"`
	Status DemoStatus `json:"status,omitempty"`
}

//+kubebuilder:object:root=true

// DemoList contains a list of Demo
type DemoList struct {
	metav1.TypeMeta `json:",inline"`
	metav1.ListMeta `json:"metadata,omitempty"`
	Items           []Demo `json:"items"`
}

func init() {
	SchemeBuilder.Register(&Demo{}, &DemoList{})
}
