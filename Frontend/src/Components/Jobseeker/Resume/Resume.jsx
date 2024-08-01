import React from 'react';
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFViewer,
  Image,
} from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: 'Helvetica',
    fontSize: 12,
    lineHeight: 1.6,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    borderBottom: '1px solid #ddd',
    paddingBottom: 10,
  },
  leftColumn: {
    width: '30%',
    alignItems: 'center',
    paddingRight: 10,
  },
  rightColumn: {
    width: '65%',
  },
  profilePic: {
    borderRadius: '50%',
    width: 100,
    height: 100,
    marginBottom: 10,
    objectFit: 'cover',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  title: {
    color: '#666',
    marginBottom: 10,
  },
  contactInfo: {
    marginBottom: 20,
    lineHeight: 1.4,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 14,
    marginBottom: 5,
    textTransform: 'uppercase',
    borderBottom: '1px solid #333',
    paddingBottom: 3,
    color: '#333',
    fontWeight: 'bold',
  },
  text: {
    marginBottom: 5,
  },
  skills: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  skill: {
    width: '50%',
    marginBottom: 3,
  },
});

// Create Document Component
const Resume = ({ formData }) => (
  <PDFViewer width="100%" height="600">
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <View style={styles.leftColumn}>
            <Image
              src={formData.profilePic || 'https://via.placeholder.com/100'}
              style={styles.profilePic}
            />
            <Text style={styles.name}>{formData.name}</Text>
            <Text style={styles.title}>{formData.title}</Text>
          </View>
          <View style={styles.rightColumn}>
            <View style={styles.contactInfo}>
              <Text>📞 {formData.phone}</Text>
              <Text>📧 {formData.email}</Text>
              <Text>📍 {formData.address}</Text>
            </View>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Profile Intro</Text>
              <Text style={styles.text}>{formData.intro}</Text>
            </View>
          </View>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View style={{ width: '45%' }}>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Education</Text>
              {formData.education.map((edu, index) => (
                <View key={index} style={styles.text}>
                  <Text>
                    <strong>{edu.year}</strong> {edu.degree}
                  </Text>
                  <Text>{edu.institution}</Text>
                </View>
              ))}
            </View>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Skills</Text>
              <View style={styles.skills}>
                {formData.skills.map((skill, index) => (
                  <Text key={index} style={styles.skill}>
                    {skill}
                  </Text>
                ))}
              </View>
            </View>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Languages</Text>
              {formData.languages.map((language, index) => (
                <Text key={index} style={styles.text}>
                  {language}
                </Text>
              ))}
            </View>
          </View>
          <View style={{ width: '45%' }}>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Projects</Text>
              {formData.projects.map((project, index) => (
                <View key={index} style={styles.text}>
                  <Text>
                    <strong>{project.name}</strong>
                  </Text>
                  <Text>{project.description}</Text>
                </View>
              ))}
            </View>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Work Experience</Text>
              {formData.workExperience.map((work, index) => (
                <View key={index} style={styles.text}>
                  <Text>
                    <strong>{work.company}</strong>
                  </Text>
                  <Text>{work.role}</Text>
                  <Text>{work.duration}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </Page>
    </Document>
  </PDFViewer>
);

export default Resume;
