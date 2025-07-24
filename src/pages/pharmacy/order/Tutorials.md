Tutorials
Jobs
Events
Courses

Write
Write
Come write articles for us and get featured
Practice
Practice
Learn and code with the best industry experts
Premium
Premium
Get access to ad-free content, doubt assistance and more!
Jobs
Jobs
Come and find your dream job with us
Geeks Digest
Quizzes
Geeks Campus
Gblog Articles
IDE
Campus Mantri
abdulsalamabubakar2023 Avatar
abdulsalamabubakar2023 Avatar
 My Profile	 Edit Profile
 My Courses	 Go Premium
 Logout
Home
Saved Videos
Courses
Practice DS & Algo.
Algorithms
Analysis of Algorithms
Data Structures
Interview Corner
Languages
CS Subjects
GATE
Web Technologies
Software Designs
School Learning
Mathematics
Maths Notes (Class 8-12)
NCERT Solutions
RD Sharma Solutions
Physics Notes (Class 8-11)
CS Exams/PSUs
ISRO
UGC NET
Student
Jobs
GBlog
Puzzles
What's New ?
 Change Language

ReactJS-Basic Concepts
ReactJS-Components
ReactJS-Props
ReactJS-Hooks
ReactJS-Advanced
ReactJS-Examples
ReactJS-Questions
ReactJS-Quiz
ReactJS-Tutorial
Web Development
Web Technology

▲
Related Articles
Create a Responsive Navbar using ReactJS
How to pass data from child component to its parent in ReactJS ?
How to fetch data from an API in ReactJS ?
ReactJS Functional Components
React.js (Introduction and Working)
ReactJS setState()
ReactJS defaultProps
How to connect Node.js with React.js ?
How to pass data from one component to other component in ReactJS ?
How to set default value in select using ReactJS ?
How to create a simple Responsive Footer in React JS ?
How to redirect to another page in ReactJS ?
ReactJS useCallback Hook
How to solve too many re-renders error in ReactJS?
What is the equivalent of document.getElementById() in React?
ReactJS Class Based Components
ReactJS useParams Hook
ReactJS Basic Concepts Complete Reference
ReactJS | Lists
How to create a Scroll To Top button in React JS ?
How to create a Responsive Sidebar with dropdown menu in ReactJS?
ReactJS | Setting up Development Environment
When to use useCallback, useMemo and useEffect ?
How to show and hide Password in ReactJS?
ReactJS | Keys
How to use files in public folder in ReactJS ?
ReactJS forceUpdate() Method
How to use onKeyPress event in ReactJS?
Re-rendering Components in ReactJS
How to include an external JavaScript library to ReactJS ?
Table of Contents
Create a Responsive Navbar using ReactJS
How to pass data from child component to its parent in ReactJS ?
How to fetch data from an API in ReactJS ?
ReactJS Functional Components
React.js (Introduction and Working)
ReactJS setState()
ReactJS defaultProps
How to connect Node.js with React.js ?
How to pass data from one component to other component in ReactJS ?
How to set default value in select using ReactJS ?
How to create a simple Responsive Footer in React JS ?
How to redirect to another page in ReactJS ?
ReactJS useCallback Hook
How to solve too many re-renders error in ReactJS?
What is the equivalent of document.getElementById() in React?
ReactJS Class Based Components
ReactJS useParams Hook
ReactJS Basic Concepts Complete Reference
ReactJS | Lists
How to create a Scroll To Top button in React JS ?
How to create a Responsive Sidebar with dropdown menu in ReactJS?
ReactJS | Setting up Development Environment
When to use useCallback, useMemo and useEffect ?
How to show and hide Password in ReactJS?
ReactJS | Keys
How to use files in public folder in ReactJS ?
ReactJS forceUpdate() Method
How to use onKeyPress event in ReactJS?
Re-rendering Components in ReactJS
How to include an external JavaScript library to ReactJS ?

ReactJS Reactstrap Tab Component
Last Updated : 22 Jul, 2021
Reactstrap is a popular front-end library that is easy to use React Bootstrap 4 components. This library contains the stateless React components for Bootstrap 4. The Tab component allows the user to switch between components present in given different tabs. We can use the following approach in ReactJS to use the ReactJS Reactstrap Tab Component.

TabContent Props:

activeTab: It is used to denote the ID for the tab which is in an active state.
TabPane Props:

tabId: It is used to denote the tab ID for the unique identification of each tab.
Creating React Application And Installing Module:

Step 1: Create a React application using the following command:

npx create-react-app foldername
Step 2: After creating your project folder i.e. foldername, move to it using the following command:

cd foldername
Step 3: After creating the ReactJS application, Install the required module using the following command:

npm install reactstrap bootstrap
Project Structure: It will look like the following.


Project Structure

Example 1: Now write down the following code in the App.js file. Here, we have shown a single tab for the user.

import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    TabContent, TabPane, Nav,
    NavItem, NavLink
} from 'reactstrap';
import classnames from 'classnames';
  
function App() {
  
    return (
        <div style={{
            display: 'block', width: 450, padding: 30
        }}>
            <h4>ReactJS Reactstrap Tab Component</h4>
            <Nav tabs>
                <NavItem>
                    <NavLink className={classnames({ active: true })}>
                        Tab Title
                    </NavLink>
                </NavItem>
            </Nav>
            <TabContent activeTab={'1'}>
                <TabPane tabId="1">
                    <div style={{backgroundColor:'green', padding:20}}>
                        Sample Tab Content
                    </div>
                </TabPane>
            </TabContent>
        </div >
    );
}
  
export default App;
Step to Run Application: Run the application using the following command from the root directory of the project:

npm start
Output: Now open your browser and go to http://localhost:3000/, you will see the following output:



Example 2: Now write down the following code in the App.js file. Here, we have shown multiple tabs for the user.

import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    TabContent, TabPane, Nav,
    NavItem, NavLink, Row, Col
} from 'reactstrap';
import classnames from 'classnames';
  
function App() {
  
    // State for current active Tab
    const [currentActiveTab, setCurrentActiveTab] = useState('1');
  
    // Toggle active state for Tab
    const toggle = tab => {
        if (currentActiveTab !== tab) setCurrentActiveTab(tab);
    }
  
    return (
        <div style={{
            display: 'block', width: 700, padding: 30
        }}>
            <h4>ReactJS Reactstrap Tab Component</h4>
            <Nav tabs>
                <NavItem>
                    <NavLink
                        className={classnames({
                            active:
                                currentActiveTab === '1'
                        })}
                        onClick={() => { toggle('1'); }}
                    >
                        Tab1
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                        className={classnames({
                            active:
                                currentActiveTab === '2'
                        })}
                        onClick={() => { toggle('2'); }}
                    >
                        Tab2
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                        className={classnames({
                            active:
                                currentActiveTab === '3'
                        })}
                        onClick={() => { toggle('3'); }}
                    >
                        Tab3
                    </NavLink>
                </NavItem>
            </Nav>
            <TabContent activeTab={currentActiveTab}>
                <TabPane tabId="1">
                    <Row>
                        <Col sm="12">
                            <h5>Sample Tab 1 Content</h5>
                        </Col>
                    </Row>
                </TabPane>
                <TabPane tabId="2">
                    <Row>
                        <Col sm="12">
                            <h5>Sample Tab 2 Content</h5>
                        </Col>
                    </Row>
                </TabPane>
                <TabPane tabId="3">
                    <Row>
                        <Col sm="12">
                            <h5>Sample Tab 3 Content</h5>
                        </Col>
                    </Row>
                </TabPane>
            </TabContent>
        </div >
    );
}
  
export default App;