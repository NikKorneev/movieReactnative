import TabButton from "@/components/ui/TabButton";
import { icons } from "@/constants/icons";
import { Tabs } from "expo-router";
import React from "react";

const Layout = () => {
	return (
		<Tabs
			screenOptions={{
				tabBarShowLabel: false,
				tabBarItemStyle: {
					width: "100%",
					height: "100%",
					justifyContent: "center",
					alignItems: "center",
				},
				tabBarStyle: {
					backgroundColor: "#0f0d23",
					borderRadius: 50,
					marginHorizontal: 10,
					marginBottom: 36,
					height: 52,
					position: "absolute",
					overflow: "hidden",
					borderColor: "0f0d23",
				},
			}}
		>
			<Tabs.Screen
				name="index"
				options={{
					title: "Home",

					headerShown: false,
					tabBarIcon: ({ focused }) => (
						<TabButton
							focused={focused}
							icon={icons.home}
							title="Home"
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="search"
				options={{
					title: "Search",
					headerShown: false,
					tabBarIcon: ({ focused }) => (
						<TabButton
							focused={focused}
							icon={icons.search}
							title="Search"
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="saved"
				options={{
					title: "Saved",
					headerShown: false,
					tabBarIcon: ({ focused }) => (
						<TabButton
							focused={focused}
							icon={icons.save}
							title="Saved"
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="profile"
				options={{
					title: "Profile",
					headerShown: false,
					tabBarIcon: ({ focused }) => (
						<TabButton
							focused={focused}
							icon={icons.person}
							title="Profile"
						/>
					),
				}}
			/>
		</Tabs>
	);
};

export default Layout;
