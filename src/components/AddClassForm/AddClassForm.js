import React, { Component } from "react";
import { navigate } from "@reach/router";
import {
  Form,
  Select,
  Card,
  InputNumber,
  Input,
  Typography,
  Button,
  Radio,
  Modal,
  message,
} from "antd";
import axios from "axios";
import "antd/dist/antd.css";

const { Option } = Select;
const layout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 3,
    span: 16,
  },
};
const { Title } = Typography;

const apiClassUrl = "http://localhost:5000/api/class";
const apiTeacherUrl = "http://localhost:5000/user/admin/api/teacher";
const apiProgramUrl = "http://localhost:5000/user/admin/api/program";

class AddClassForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      teacherData: "",
      programData: "",
      routineFor: "",
      subjectName: "",
      teacherName: [""],
      classCode: "",
      classGroup: "",
      startingPeriod: "1",
      noOfPeriod: "",
      courseCode: "",
      link1: "",
      weekDay: "",
    };
  }

  componentDidMount() {
    this.getProgramData();
    this.getTeacherData();
    // console.log(this.state.programData)
    // console.log(this.state.teacherData)
  }

  getTeacherData = async () => {
    let { data: res } = await axios.get(apiTeacherUrl);
    this.setState({ teacherData: res.data });
  };
  getProgramData = async () => {
    let { data: res } = await axios.get(apiProgramUrl);
    this.setState({ programData: res.data });
  };

  onFinish = (values) => {
    console.log("Received values of form: ", values.routineFor);
    axios
      .post(apiClassUrl, {
        routineFor: values.routineFor,
        subjectName: values.subjectName,
        teacherName: values.teacherName,
        classCode: values.classCode,
        classGroup: values.classGroup,
        startingPeriod: values.startingPeriod,
        noOfPeriod: values.noOfPeriod,
        courseCode: values.courseCode,
        link1: values.link1,
        weekDay: values.weekDay,
      })
      .then(message.success("Class Added Sucessfully"))
      .then(navigate("/class"));
  };

  render() {
    const {
      programData,
      teacherData,
      // routineFor,
      subjectName,
      // teacherName,
      // classCode,
      // classGroup,
      startingPeriod,
      // noOfPeriod,
      // courseCode,
      // link1,
      // weekDay,
    } = this.state;

    return (
      <Card
        className="card"
        style={{ backgroundColor: "#F3F1FF", margin: "12px" }}
      >
        <Title className="input" level={3}>
          Add/Edit Class
        </Title>
        <Form
          {...layout}
          ref={this.formRef}
          name="control-ref"
          onFinish={this.onFinish}
        >
          <Form.Item
            name="routineFor"
            label="Routine For"
            rules={[
              {
                required: true,
                message: "Please select a programme",
              },
            ]}
          >
            <Select
              placeholder="Select a option and change input text above"
              onChange={(value) => this.setState({ routineFor: value })}
              allowClear
            >
              {Object.values(programData).map((item, index) => {
                return (
                  <Option value={item._id}>
                    {item.programName}_{item.year}year_
                    {item.part}part
                  </Option>
                );
              })}
            </Select>
          </Form.Item>
          <Form.Item
            name="weekDay"
            label="Week Day"
            rules={[
              {
                required: true,
                message: "Please select a Week Day",
              },
            ]}
          >
            <Select
              placeholder="Select a option and change input text above"
              onChange={(value) => this.setState({ weekDay: value })}
              allowClear
            >
              <Option value="sunday">Sunday</Option>
              <Option value="monday">Monday</Option>
              <Option value="tuesday">Tuesday</Option>
              <Option value="wednesday">Wednesday</Option>
              <Option value="thursday">Thursday</Option>
              <Option value="friday">Friday</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="courseCode"
            label="Course Code"
            rules={[
              {
                required: false,
                message: "Please enter Course Code",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="subjectName"
            label="Subject Name"
            rules={[
              {
                required: true,
                message: "Please enter Subject Name",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="classCode"
            label="Class Code"
            rules={[
              {
                required: false,
                message: "Please enter Class Code",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="teacherName"
            label="Select Teachers"
            rules={[
              {
                required: true,
                message: "Please select teachers name",
                type: "array",
              },
            ]}
          >
            <Select
              mode="multiple"
              placeholder="Select a option and change input text above"
              onChange={(value) => this.setState({ teacherName: value })}
            >
              {Object.values(teacherData).map((item, index) => {
                return <Option value={item._id}>{item.teacherName}</Option>;
              })}
            </Select>
          </Form.Item>

          <Form.Item
            name="classGroup"
            label="Class Group"
            rules={[
              {
                required: false,
                message: "Please enter Class Group",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Starting Period">
            <Form.Item
              name="startingPeriod"
              rules={[
                {
                  required: true,
                  message: "Please enter Starting Period",
                },
              ]}
              noStyle
            >
              <InputNumber value={startingPeriod} min={1} max={8} />
            </Form.Item>
          </Form.Item>

          <Form.Item label="No Of Periods">
            <Form.Item
              name="noOfPeriod"
              rules={[
                {
                  required: true,
                  message: "Please enter No Of Periods",
                },
              ]}
              noStyle
            >
              <InputNumber min={1} max={8} />
            </Form.Item>
          </Form.Item>

          <Form.Item
            name="link1"
            label="Class Link"
            rules={[
              {
                required: false,
                message: "Please enter Class Link",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Button
              type="primary"
              style={{ backgroundColor: "#141414" }}
              htmlType="submit"
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Card>
    );
  }
}

const subjects = [
  "Engineering Mathematics I",
  "Computer Programming",
  "Engineering Drawing I",
  "Engineering Physics",
  "Applied Mechanics",
  "Basic Electrical Engineering",

  "Engineering Mathematics II",
  "Engineering Drawing II",
  "Basic Electronics Engineering",
  "Engineering Chemistry",
  "Thermodynamics and heat Transfer",
  "Workshop Technology",

  "Engineering Mathematics III",
  "Object Oriented Programming",
  "Theory of Computation",
  "Electric Circuit Theory",
  "Electronic Devices and Circuits",
  "Digital Logic",
  "Electromagnetics",

  "Applied Mathematics",
  "Numerical Methods",
  "Instrumentation I",
  "Electrical Machines",
  "Discrete Structure",
  "Data Structure and Algorithm",
  "Microprocessor",

  "Communication English",
  "Probability and Stats",
  "Software Engineering",
  "Data Communication",
  "Computer Organization and Architecture",
  "Instrumentation II",
  "Computer Graphics",

  "Engineering Economics",
  "Object Oriented Analysis & Design",
  "Database Management System",
  "Artificial Intelligence",
  "Embedded System",
  "Operating System",
  "Minor Project",

  "Organization and Management",
  "Energy Environment and Society",
  "Project Management",
  "Computer Network",
  "Distributed System",
  "Digital Signal Analysis and Processing",
  "Elective I",

  "Project(Part A)",
  "Professional Practice",
  "Information Systems",
  "Simulation and Modelling",
  "Internet and Intranet",
  "Elective II",
  "Elective III",
  "Project(Part B)",
];
const courseCode = [
  "SH401",
  "CT401",
  "ME401",
  "SH402",
  "CE401",
  "EE401",

  "SH451",
  "ME451",
  "EX451",
  "SH453",
  "ME452",
  "ME453",

  "SH501",
  "CT501",
  "CT502",
  "EE501",
  "EX501",
  "EX502",
  "EX503",

  "SH551",
  "SH553",
  "EE552",
  "EE554",
  "CT551",
  "CT552",
  "EX551",

  "SH601",
  "SH602",
  "CT601",
  "CT602",
  "CT603",
  "EX602",
  "EX603",

  "CE655",
  "CT651",
  "CT652",
  "CT653",
  "CT655",
  "CT656",
  "CT654",

  "ME708",
  "EX701",
  "CT701",
  "CT702",
  "CT703",
  "CT704",
  "CT725",
  "CT707",

  "CE752",
  "CT751",
  "CT753",
  "CT754",
  "CT765",
  "CT785",
  "CT755",
];

class AddClassPopupForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      teacherData: "",
      programData: "",
      routineFor: "",
      subjectName: "",
      teacherName: [""],
      classCode: "",
      classGroup: "",
      startingPeriod: "1",
      noOfPeriod: "",
      courseCode: "",
      link1: "",
      weekDay: "",
    };
  }

  componentDidMount() {
    this.getTeacherData();
  }

  getTeacherData = async () => {
    let { data: res } = await axios.get(apiTeacherUrl);
    this.setState({ teacherData: res.data });
  };

  onFinish = (values) => {
    const { program, day, index } = this.props;

    let programID;
    switch (program) {
      case "073BCTAB":
        programID = "5fa7b033781e9b0d749f7b9e";
        break;
      case "074BEXCD":
        programID = "5fa6b5dad734150d70d5afb6";
        break;
      case "074BCTCD":
        programID = "5fa76bea2331c4219cb0fe10";
        break;
      case "075BCTCD":
        programID = "5fa76c172331c4219cb0fe13";
        break;
      default:
        break;
    }
    axios
      .post(apiClassUrl, {
        routineFor: programID,
        subjectName: values.subjectName,
        teacherName: values.teacherName,
        classCode: values.classCode,
        classGroup: values.classGroup,
        startingPeriod: index,
        noOfPeriod: values.noOfPeriod,
        courseCode: values.courseCode,
        link1: values.link1,
        weekDay: day,
      })
      .then(message.success("Class Added Sucessfully"));
    window.location.reload();
  };

  handleTeacherSelection(teachers) {
    let { teacherTable, program, day, index } = this.props;
    for (let teacher of teachers)
      if (teacherTable[teacher] && teacherTable[teacher][index]) {
        Modal.warn({
          title: `Teacher occupied on ${program} on ${day} period ${index}`,
        });
        return;
      }
    this.setState({ teacherName: teachers });
  }

  render() {
    const {
      // programData,
      teacherData,
      // routineFor,
      // subjectName,
      // teacherName,
      // classCode,
      // classGroup,
      // startingPeriod,
      // noOfPeriod,
      // courseCode,
      // link1,
      // weekDay,
    } = this.state;

    return (
      <>
        <Form
          {...layout}
          ref={this.formRef}
          name="control-ref"
          onFinish={this.onFinish}
        >
          <Form.Item
            name="subjectName"
            label="Subject"
            rules={[
              {
                required: true,
                message: "Please enter Subject Name",
              },
            ]}
          >
            <Select
              onChange={(value) => this.setState({ subjectName: value })}
              rules={[
                {
                  required: true,
                  message: "Please enter Subject Name",
                },
              ]}
            >
              {subjects.map((item, index) => {
                return (
                  <Option key={item} value={item}>
                    {item + ` (${courseCode[index]})`}
                  </Option>
                );
              })}
            </Select>
          </Form.Item>
          <Form.Item
            name="classCode"
            label="Class Code"
            rules={[
              {
                required: false,
                message: "Please enter Class Code",
              },
            ]}
            initialValue="L"
          >
            <Radio.Group defaultValue={"L"}>
              <Radio.Button key="L" value="L">
                Lecture [L]
              </Radio.Button>
              <Radio.Button key="L" value="P">
                Practical [P]
              </Radio.Button>
            </Radio.Group>
          </Form.Item>

          <Form.Item
            name="teacherName"
            label="Teachers"
            rules={[
              {
                required: true,
                message: "Please select teachers name",
                type: "array",
              },
            ]}
          >
            <Select
              mode="multiple"
              // placeholder="Select a option and change input text above"
              onChange={(value) => this.handleTeacherSelection(value)}
              dropdownAlign="bottom"
            >
              {Object.values(teacherData).map((item, index) => {
                return (
                  <Option key={item} value={item._id}>
                    {item.teacherName}
                  </Option>
                );
              })}
            </Select>
          </Form.Item>

          <Form.Item
            name="classGroup"
            label="Class Group"
            rules={[
              {
                required: false,
                message: "Please enter Class Group",
              },
            ]}
            initialValue="Both"
          >
            <Radio.Group defaultValue={"Both"}>
              <Radio.Button key="C" value="C">
                C
              </Radio.Button>
              <Radio.Button key="D" value="D">
                D
              </Radio.Button>
              <Radio.Button key="Both" value="Both">
                Both
              </Radio.Button>
            </Radio.Group>
          </Form.Item>

          <Form.Item label="No Of Periods">
            <Form.Item
              name="noOfPeriod"
              rules={[
                {
                  required: true,
                  message: "Please enter No Of Periods",
                },
              ]}
              noStyle
              initialValue="1"
            >
              <Radio.Group defaultValue="1">
                <Radio.Button key="1" value="1">
                  1
                </Radio.Button>
                <Radio.Button key="2" value="2">
                  2
                </Radio.Button>
                <Radio.Button key="3" value="3">
                  3
                </Radio.Button>
              </Radio.Group>
            </Form.Item>
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Button
              type="primary"
              style={{ backgroundColor: "#141414" }}
              htmlType="submit"
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </>
    );
  }
}

export { AddClassForm, AddClassPopupForm };
