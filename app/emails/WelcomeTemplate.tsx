import { Body, Html, Preview, Text } from '@react-email/components'
import parse from 'html-react-parser'

interface Prop {
  message: string
  name: string
  phone: string
}

const WelcomeTemplate = ({ message, name, phone }: Prop) => {
  return (
    <Html>
      <Preview>Enquiry from Nazs.Net</Preview>
      <Body style={style}>
        {/* <Container> */}
        <Text>Dear {name},</Text>
        <Text>We have received your enquiry.</Text>
        <Text>Thank you.</Text>
        <Text>
          Nazs.Net Team
          <br />
        </Text>
        <hr />
        <p></p>
        <Text style={other}>Your message:</Text>
        <Text>{parse(message)}</Text>
        <p></p>
        <Text style={other}>Your phone: {phone} </Text>
        <hr />
        {/* </Container> */}
      </Body>
    </Html>
  )
}

const style = {
  fontSize: '13px',
  color: '#333',
  fontFamily: 'Verdana',
  paddingLeft: '10px',
  // whiteSpace: 'pre-wrap',
}
const link = {
  textDecoration: 'none',
}

const other = {
  fontStyle: 'italic',
}

export default WelcomeTemplate
