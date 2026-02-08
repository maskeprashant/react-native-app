import { IMAGES } from "@/utils/constants";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  ImageBackground,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
/* ---------------- TYPES ---------------- */
type Task = "Read" | "Code" | "Tutorial" | "Listen";
type Subject = "React" | "JavaScript" | "Python" | "DSA";

/* ---------------- CONSTANTS ---------------- */
const DURATIONS = [1, 5, 10, 20, 30, 40, 50, 60];
const TASKS: Task[] = ["Read", "Code", "Tutorial", "Listen"];
const SUBJECTS: Subject[] = ["React", "JavaScript", "Python", "DSA"];

const TASK_ICONS: Record<Task, keyof typeof Ionicons.glyphMap> = {
  Read: "book",
  Code: "code-slash",
  Tutorial: "play-circle",
  Listen: "headset",
};

const SUBJECT_ICONS: Record<Subject, keyof typeof Ionicons.glyphMap> = {
  React: "logo-react",
  JavaScript: "logo-javascript",
  Python: "logo-python",
  DSA: "git-branch",
};

export default function StudySessionScreen(): JSX.Element {
  /* ---------------- FORM STATE ---------------- */
  const [date, setDate] = useState<Date>(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [duration, setDuration] = useState<number | null>(1);
  const [sessions, setSessions] = useState<number | null>(1);
  const [task, setTask] = useState<Task | null>("Read");
  const [subject, setSubject] = useState<Subject | null>("React");

  /* ---------------- SESSION STATE ---------------- */
  const [started, setStarted] = useState(false);
  const [currentSession, setCurrentSession] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [completedSessions, setCompletedSessions] = useState<number[]>([]);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const pulseAnim = useRef(new Animated.Value(1)).current;

  /* ---------------- TIMER ---------------- */
  useEffect(() => {
    if (!started || !duration || !sessions) return;

    if (currentSession >= sessions) {
      clearTimer();
      return;
    }

    if (timeLeft === 0) {
      setCompletedSessions((p) => [...p, currentSession]);
      setCurrentSession((p) => p + 1);
      setTimeLeft(duration * 60);
      return;
    }

    timerRef.current = setTimeout(() => {
      setTimeLeft((p) => p - 1);
    }, 1000);

    return clearTimer;
  }, [timeLeft, started]);

  /* ---------------- PULSE ANIMATION ---------------- */
  useEffect(() => {
    if (started && currentSession < (sessions ?? 0)) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.05,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
        ]),
      ).start();
    }
  }, [started, currentSession]);

  const clearTimer = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = null;
  };

  const startSession = () => {
    if (!duration || !sessions) return;
    setStarted(true);
    setCompletedSessions([]);
    setCurrentSession(0);
    setTimeLeft(duration * 60);
  };

  const cancelSession = () => {
    clearTimer();
    setStarted(false);
    setCompletedSessions([]);
    setCurrentSession(0);
    setTimeLeft(0);
  };

  const formatTime = () => {
    const m = Math.floor(timeLeft / 60);
    const s = timeLeft % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  const onDateChange = (_: DateTimePickerEvent, selected?: Date) => {
    setShowDatePicker(false);
    if (selected) setDate(selected);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getProgressPercentage = () => {
    if (!sessions || !duration) return 0;
    const totalTime = sessions * duration * 60;
    const elapsedTime =
      currentSession * duration * 60 + (duration * 60 - timeLeft);
    return (elapsedTime / totalTime) * 100;
  };

  return (
    <SafeAreaView className="flex-1 text-gray-900">
      <ImageBackground
        source={IMAGES.backgroundImage}
        className="w-full h-[100vh] flex-1 absolute top-0 left-0"
        alt=""
      />
      <ScrollView className="flex-1 px-4 pt-6">
        {!started ? (
          /* ================= FORM ================= */
          <View className="space-y-6 pb-8">
            {/* Header with Gradient */}
            <View className="space-y-3 mb-4">
              <View className="flex-row items-center space-x-3">
                <View className="bg-slate-500 p-3 rounded-2xl mr-4">
                  <Ionicons name="school" size={32} color="violet" />
                </View>
                <View className="flex-1">
                  <Text className="text-white text-4xl font-bold">
                    Study Session
                  </Text>
                  <Text className="text-slate-100 text-base mt-1">
                    Build your perfect learning routine
                  </Text>
                </View>
              </View>
            </View>

            {/* Main Card with Glass Panel Effect */}
            <View
              className="bg-blue-500/10 border border-white/20 rounded-2xl p-5 shadow-lg backdrop-blur-sm"
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.4)",
                borderWidth: 1,
                borderColor: "rgba(255, 255, 255, 0.3)",
              }}
            >
              {/* Pattern Overlay */}
              <View
                className="absolute inset-0 opacity-10 pointer-events-none"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,.05) 10px, rgba(255,255,255,.05) 20px)",
                }}
              />
              {/* Date */}
              <View className="mb-5">
                <Section label="📅 Date:" icon="calendar">
                  <TouchableOpacity
                    onPress={() => setShowDatePicker(true)}
                    className=" p-5 rounded-2xl border border-white flex-row items-center justify-between active:bg-[#252b4a]"
                  >
                    <Text className="text-white text-base font-medium">
                      {formatDate(date)}
                    </Text>
                    <Ionicons name="chevron-down" size={20} color="#94A3B8" />
                  </TouchableOpacity>
                </Section>
              </View>

              <View className="mb-5">
                {showDatePicker && (
                  <DateTimePicker
                    value={date}
                    mode="date"
                    display={Platform.OS === "ios" ? "spinner" : "default"}
                    onChange={onDateChange}
                  />
                )}
              </View>

              {/* Duration */}
              <View className="mb-5 flex">
                <Section label="⏱️ Study Duration" icon="time">
                  <PillGrid
                    data={DURATIONS}
                    selected={duration}
                    onSelect={setDuration}
                    suffix="min"
                  />
                </Section>
              </View>

              {/* Sessions */}
              <View className="mb-5 flex">
                <Section label="🔄 Sessions per Day" icon="repeat">
                  <PillGrid
                    data={[...Array(10)].map((_, i) => i + 1)}
                    selected={sessions}
                    onSelect={setSessions}
                  />
                </Section>
              </View>

              {/* Task */}
              <View className="mb-5 flex">
                <Section label="📝 Task Type" icon="list">
                  <TaskGrid data={TASKS} selected={task} onSelect={setTask} />
                </Section>
              </View>

              {/* Subject */}
              <View className="mb-0 flex text-3xl">
                <Section label="📚 Subject" icon="book">
                  <SubjectGrid
                    data={SUBJECTS}
                    selected={subject}
                    onSelect={setSubject}
                  />
                </Section>
              </View>
            </View>

            {/* CTA Button with Gradient */}
            <TouchableOpacity
              disabled={!duration || !sessions || !task || !subject}
              onPress={startSession}
              className={`py-6 rounded-2xl shadow-lg mt-5 ${
                duration && sessions && task && subject
                  ? "border border-indigo-400 bg-white"
                  : "border border-white bg-transparent"
              }`}
            >
              <View className="flex-row items-center justify-center space-x-2">
                <Ionicons name="play-circle" size={24} color="gray" />
                <Text className="text-indigo-400 text-center text-xl font-bold">
                  Start Session
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        ) : (
          /* ================= SESSION ================= */
          <View className="space-y-8 pb-8">
            {/* Header */}
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center space-x-3">
                <View className="bg-indigo-500/20 p-3 rounded-2xl">
                  <Ionicons name="timer" size={28} color="#ffffff/2" />
                </View>
                <Text className="text-3xl ml-4 font-bold text-white">
                  Focus Mode
                </Text>
              </View>
            </View>

            {/* Summary Card with Icons */}
            <View className="bg-white/40 blur-2xl border border-white  my-4 p-6 rounded-3xl shadow-2xl space-y-3">
              <View className="flex-row items-center space-x-2 mb-2">
                <Ionicons
                  name="calendar"
                  size={16}
                  color="white"
                  className="mr-2"
                />
                <Text className="text-white text-2xl font-semibold">
                  {formatDate(date)}
                </Text>
              </View>
              <View className="flex-row items-center space-x-2 mb-1">
                <Ionicons
                  name={SUBJECT_ICONS[subject!]}
                  size={16}
                  color="white"
                  className="mr-2"
                />
                <Text className="text-white font-semibold">{subject}</Text>
                <Text className="text-white/80">•</Text>
                <Ionicons
                  name={TASK_ICONS[task!]}
                  size={16}
                  color="white"
                  style={{ marginRight: 2 }}
                />
                <Text className="text-white font-semibold">{task}</Text>
              </View>
              <View className="flex-row items-center space-x-2 mb-1">
                <Ionicons
                  name="repeat"
                  size={16}
                  color="white"
                  className="mr-2"
                />
                <Text className="text-white font-semibold">
                  {sessions} sessions × {duration} min
                </Text>
              </View>

              {/* Progress Bar */}
              <View className="mt-4 mb-2">
                <View className="bg-white/20 h-2 rounded-full overflow-hidden">
                  <View
                    className="bg-white h-full rounded-full"
                    style={{ width: `${getProgressPercentage()}%` }}
                  />
                </View>
                <Text className="text-white/80 text-sm mt-2 text-right">
                  {Math.round(getProgressPercentage())}% Complete
                </Text>
              </View>
            </View>

            {/* Timer Display */}
            <View className="bg-[#12172A] rounded-3xl p-8 items-center shadow-2xl border border-slate-800/50">
              <Text className="text-slate-400 text-base uppercase tracking-widest mb-2">
                {currentSession < (sessions ?? 0)
                  ? `Session ${currentSession + 1}`
                  : "Complete"}
              </Text>
              <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
                <Text className="text-indigo-400 text-7xl font-bold text-center">
                  {currentSession < (sessions ?? 0) ? formatTime() : "🎉"}
                </Text>
              </Animated.View>
              {currentSession >= (sessions ?? 0) && (
                <Text className="text-slate-400 text-lg mt-4">
                  All sessions completed!
                </Text>
              )}
            </View>

            {/* Progress Grid */}
            <View>
              <Text className="text-slate-800 uppercase text-sm tracking-widest my-4">
                Session Progress
              </Text>
              <View className="flex-row flex-wrap gap-3 my-4">
                {[...Array(sessions ?? 0)].map((_, i) => {
                  const done = completedSessions.includes(i);
                  const active = i === currentSession && !done;
                  return (
                    <View
                      key={i}
                      className={`w-[30%] flex h-30 rounded-2xl items-center justify-center shadow-lg ${
                        done
                          ? "bg-green-500"
                          : active
                            ? "bg-indigo-500 border-2 border-white/30"
                            : "bg-[#1B2040] border border-slate-700/50"
                      }`}
                    >
                      {done ? (
                        <Ionicons
                          name="checkmark-circle"
                          size={40}
                          color="white"
                        />
                      ) : active ? (
                        <Ionicons name="timer" size={32} color="white" />
                      ) : (
                        <Text className="text-slate-400 text-2xl font-bold">
                          {i + 1}
                        </Text>
                      )}
                    </View>
                  );
                })}
              </View>
            </View>

            {/* Cancel Button */}
            <TouchableOpacity
              onPress={cancelSession}
              className="py-5 rounded-2xl border-2 border-red-500/50 bg-red-500/10 active:bg-red-500/20"
            >
              <View className="flex-row items-center justify-center space-x-2">
                <Ionicons name="close-circle" size={20} color="#EF4444" />
                <Text className="text-red-400 text-center font-bold text-lg">
                  End Session
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

/* ---------------- UI HELPERS ---------------- */

function Section({
  label,
  children,
  icon,
}: {
  label: string;
  children: React.ReactNode;
  icon?: keyof typeof Ionicons.glyphMap;
}) {
  return (
    <View className="space-y-3">
      <View className="flex-row items-center space-x-2">
        <Text className="text-slate-300 font-semibold text-sm tracking-wide">
          {label}
        </Text>
      </View>
      {children}
    </View>
  );
}

function PillGrid<T extends string | number>({
  data,
  selected,
  onSelect,
  suffix,
}: {
  data: T[];
  selected: T | null;
  onSelect: (v: T) => void;
  suffix?: string;
}) {
  return (
    <View className="flex-row flex-wrap gap-3">
      {data.map((item) => {
        const active = selected === item;
        return (
          <TouchableOpacity
            key={item.toString()}
            onPress={() => onSelect(item)}
            className={`px-5 py-3 rounded-xl shadow-sm ${
              active
                ? " border border-indigo-400 bg-white"
                : " border border-white"
            }`}
          >
            <Text
              className={`${active ? "text-gray-700 font-bold" : "text-white"}`}
            >
              {item}
              {suffix ? ` ${suffix}` : ""}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

function TaskGrid({
  data,
  selected,
  onSelect,
}: {
  data: Task[];
  selected: Task | null;
  onSelect: (v: Task) => void;
}) {
  return (
    <View className="flex-row flex-wrap gap-3">
      {data.map((item) => {
        const active = selected === item;
        return (
          <TouchableOpacity
            key={item}
            onPress={() => onSelect(item)}
            className={`flex-1 min-w-[45%] px-4 py-4 rounded-xl shadow-sm flex-row items-center space-x-2 ${
              active
                ? "bg-white border border-indigo-400"
                : " border border-white"
            }`}
          >
            <Ionicons
              name={TASK_ICONS[item]}
              size={20}
              color={active ? "gray" : "indigo"}
              style={{ marginRight: 10 }}
            />
            <Text
              className={`${active ? "text-gray-600 font-bold" : "text-slate-300"}`}
            >
              {item}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

function SubjectGrid({
  data,
  selected,
  onSelect,
}: {
  data: Subject[];
  selected: Subject | null;
  onSelect: (v: Subject) => void;
}) {
  return (
    <View className="flex-row flex-wrap gap-3">
      {data.map((item) => {
        const active = selected === item;
        return (
          <TouchableOpacity
            key={item}
            onPress={() => onSelect(item)}
            className={`flex-1 min-w-[45%] px-4 py-4 rounded-xl shadow-sm flex-row items-center space-x-2 ${
              active
                ? "bg-white border border-indigo-400"
                : " border border-white"
            }`}
          >
            <Ionicons
              name={SUBJECT_ICONS[item]}
              size={20}
              color={active ? "gray" : "indigo"}
              style={{ marginRight: 10 }}
            />
            <Text
              className={`${active ? "text-gray-900 font-bold" : "text-white"}`}
            >
              {item}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
