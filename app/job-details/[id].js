import { Text, View, SafeAreView, ActivityIndicator, RefreshControl } from 'react'

import { Stack, useRouter, useSearchParams } from 'expo-router';
import { useCallback, useState } from 'react';


import { Company, JobAbout, JobFooter, JobTabs, ScreenHeaderBtn, Specifics } from '../../components';
import { COLORS, icons, SIZES } from '../../constants';
import { ScrollView } from 'react-native-gesture-handler';
import useFetch from '../../hook/useFetch';

const tabs = ["About",  "Qualifications","Responsibilites"];

const JobDetails = () => {
  const params = useSearchParams();
  const router = useRouter();

  const { data, isLoading, error, refetch } = useFetch('hob-details', {
    job_id: params.id
  })

  const [refreshing, setRefreshing] = useState(false);
  const [activeTab,setActiveTab] = useState(tabs[0]);

  const onRefresh = () => {}

  const displayTabContent = ()=>{
    switch (activeTab) {
      case "Qualifications":
        return <Specifics 
        title="Qualifications"
        points={data[0].job_highlights?.Qualifications ?? ['N/A']}
        />
      case "About":
        return<JobAbout
        info = {data[0].job_description ?? "No data provided"}
        />
      case "Responsibilites":
        return<Specifics
        title = "Responsibilites"
        points={data[0].job_highlights?.Responsibilites ?? ['N/A']}
        />
      default:
        break;
    }
  }

  return (
    <SafeAreView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerBackVisible: false,
          headerLeft: () => (
            <ScreenHeaderBtn
              iconUrl={icons.left}
              dimension="60%"
              handlePress={() => router.back()}
            />
          ), headerRight: () => (
            <ScreenHeaderBtn
              iconUrl={icons.share}
              dimension="60%"
            />
          ),
          headerTitle: ''
        }}
      />

      <>
        <ScrollView showsVerticalScrollIndicator={false} refreshControl=
          {<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
          {isLoading ? (
            <ActivityIndicator size="large" color={COLORS.primary} />
          ) : error ? (
            <Text>Something went wrong</Text>
          ) : data.length === 0 ? (
            <Text>No data</Text>
          ) : (
            <View style={{ padding: SIZES.medium, paddingBottom: 100 }}>
              <Company
                companyLogo={data[0].employer_logo}
                jobTitle={data[0].job_title}
                companyName={data[0].employer_name}
                location={data[0].job_country}
              />

              <JobTabs 
              
              tabs={tabs}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              />

              {displayTabContent()}

            </View>
          )}
        </ScrollView>
      </>
    </SafeAreView >
  )

}

export default JobDetails